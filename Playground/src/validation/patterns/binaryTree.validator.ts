import ts from "typescript";
import type { LoopNode, PrimaryFunction, ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  assignments,
  declarationName,
  identifiers,
  isZero,
  loopCondition,
  mutations,
  walk,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface CollectionLoop {
  root: string;
  collection: string;
  loop: LoopNode;
}

interface StackModel extends CollectionLoop {
  node: string;
}

interface LevelSizeModel extends CollectionLoop {
  size: string;
}

interface LevelLoopModel extends LevelSizeModel {
  index: string;
  levelLoop: LoopNode;
  node: string;
}

function unwrapExpression(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isTypeAssertionExpression(current)
    || ts.isNonNullExpression(current)) {
    current = current.expression;
  }
  return current;
}

function identifierName(expression: ts.Expression | undefined): string | null {
  if (!expression) return null;
  const value = unwrapExpression(expression);
  return ts.isIdentifier(value) ? value.text : null;
}

function parameterNames(context: ValidationContext): string[] {
  return context.parameters.map(declarationName).filter((name): name is string => Boolean(name));
}

function primaryFunctionName(fn: PrimaryFunction | null): string | null {
  if (!fn) return null;
  if ((ts.isFunctionDeclaration(fn) || ts.isFunctionExpression(fn)) && fn.name) return fn.name.text;
  if (ts.isMethodDeclaration(fn) && ts.isIdentifier(fn.name)) return fn.name.text;
  if ((ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) && ts.isVariableDeclaration(fn.parent)
    && ts.isIdentifier(fn.parent.name)) return fn.parent.name.text;
  return null;
}

function isNullish(expression: ts.Expression): boolean {
  const value = unwrapExpression(expression);
  return value.kind === ts.SyntaxKind.NullKeyword
    || (ts.isIdentifier(value) && value.text === "undefined")
    || (ts.isVoidExpression(value) && ts.isNumericLiteral(value.expression));
}

function isMissingNodeCheck(expression: ts.Expression, root: string): boolean {
  const value = unwrapExpression(expression);
  if (ts.isPrefixUnaryExpression(value) && value.operator === ts.SyntaxKind.ExclamationToken) {
    return identifierName(value.operand) === root;
  }
  if (!ts.isBinaryExpression(value)) return false;
  if (value.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    return isMissingNodeCheck(value.left, root) || isMissingNodeCheck(value.right, root);
  }
  const isEquality = value.operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken
    || value.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken;
  if (!isEquality) return false;
  return (identifierName(value.left) === root && isNullish(value.right))
    || (isNullish(value.left) && identifierName(value.right) === root);
}

function containsReturn(statement: ts.Statement): boolean {
  let found = false;
  walk(statement, (node) => {
    if (ts.isReturnStatement(node)) found = true;
  });
  return found;
}

function childSide(expression: ts.Expression, node: string): "left" | "right" | null {
  const value = unwrapExpression(expression);
  if (!ts.isPropertyAccessExpression(value) || identifierName(value.expression) !== node) return null;
  if (value.name.text === "left" || value.name.text === "right") return value.name.text;
  return null;
}

function baseCases(context: ValidationContext, root: string): ts.IfStatement[] {
  return context.branches.filter((branch) => isMissingNodeCheck(branch.expression, root) && containsReturn(branch.thenStatement));
}

const nullBaseCase: RuleValidator = (context) => parameterNames(context).some((root) => baseCases(context, root).length > 0);

const recursiveChildVisits: RuleValidator = (context) => {
  const functionName = primaryFunctionName(context.primaryFunction);
  if (!functionName) return false;
  return parameterNames(context).some((root) => {
    const rootBaseCases = baseCases(context, root);
    if (rootBaseCases.length === 0) return false;
    const sides = new Set<"left" | "right">();
    for (const call of context.calls) {
      if (identifierName(call.expression) !== functionName) continue;
      if (!rootBaseCases.some((baseCase) => call.getStart(context.source) >= baseCase.end)) continue;
      for (const argument of call.arguments) {
        const side = childSide(argument, root);
        if (side) sides.add(side);
      }
    }
    return sides.has("left") && sides.has("right");
  });
};

function arraySeed(expression: ts.Expression | undefined, root: string): boolean {
  if (!expression) return false;
  const value = unwrapExpression(expression);
  return ts.isArrayLiteralExpression(value)
    && value.elements.some((element) => identifierName(element) === root);
}

function collectionLength(expression: ts.Expression, collection: string): boolean {
  const value = unwrapExpression(expression);
  return ts.isPropertyAccessExpression(value)
    && value.name.text === "length"
    && identifierName(value.expression) === collection;
}

function referencesCollectionLength(node: ts.Node, collection: string): boolean {
  let found = false;
  walk(node, (current) => {
    if (ts.isPropertyAccessExpression(current) && collectionLength(current, collection)) found = true;
  });
  return found;
}

function collectionCall(call: ts.CallExpression, collection: string, method: string): boolean {
  const target = unwrapExpression(call.expression);
  return ts.isPropertyAccessExpression(target)
    && target.name.text === method
    && identifierName(target.expression) === collection;
}

function seededCollectionLoops(context: ValidationContext): CollectionLoop[] {
  const models: CollectionLoop[] = [];
  for (const root of parameterNames(context)) {
    for (const declaration of context.variables) {
      const collection = declarationName(declaration);
      if (!collection || !arraySeed(declaration.initializer, root)) continue;
      for (const loop of context.loops) {
        const condition = loopCondition(loop);
        if (condition && referencesCollectionLength(condition, collection)) models.push({ root, collection, loop });
      }
    }
  }
  return models;
}

function declarationAssignedCall(context: ValidationContext, call: ts.CallExpression): string | null {
  const declaration = context.variables.find((candidate) => candidate.initializer
    && unwrapExpression(candidate.initializer) === call);
  if (declaration) return declarationName(declaration);
  const assignment = context.primaryFunction && assignments(context.primaryFunction).find((candidate) => unwrapExpression(candidate.value) === call);
  return assignment?.name ?? null;
}

function stackModels(context: ValidationContext): StackModel[] {
  const models: StackModel[] = [];
  for (const seed of seededCollectionLoops(context)) {
    for (const call of context.calls) {
      if (!isDescendantOf(call, seed.loop) || !collectionCall(call, seed.collection, "pop")) continue;
      const node = declarationAssignedCall(context, call);
      if (node) models.push({ ...seed, node });
    }
  }
  return models;
}

function pushedChildSides(context: ValidationContext, collection: string, node: string, ancestor: ts.Node): Set<"left" | "right"> {
  const sides = new Set<"left" | "right">();
  for (const branch of context.branches) {
    if (!isDescendantOf(branch, ancestor)) continue;
    const guardedSide = guardedChildSide(branch.expression, node);
    if (!guardedSide) continue;
    for (const call of context.calls) {
      if (!isDescendantOf(call, branch.thenStatement) || !collectionCall(call, collection, "push")) continue;
      if (call.arguments.some((argument) => childSide(argument, node) === guardedSide)) sides.add(guardedSide);
    }
  }
  return sides;
}

function guardedChildSide(expression: ts.Expression, node: string): "left" | "right" | null {
  const value = unwrapExpression(expression);
  const direct = childSide(value, node);
  if (direct) return direct;
  if (!ts.isBinaryExpression(value)) return null;
  const isPresenceComparison = [
    ts.SyntaxKind.ExclamationEqualsToken,
    ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ].includes(value.operatorToken.kind);
  if (!isPresenceComparison) return null;
  if (isNullish(value.right)) return childSide(value.left, node);
  if (isNullish(value.left)) return childSide(value.right, node);
  return null;
}

const traversalStack: RuleValidator = (context) => stackModels(context).length > 0;

const iterativeChildVisits: RuleValidator = (context) => stackModels(context).some((model) => {
  const sides = pushedChildSides(context, model.collection, model.node, model.loop);
  return sides.has("left") && sides.has("right");
});

function sizeModels(context: ValidationContext): LevelSizeModel[] {
  const models: LevelSizeModel[] = [];
  for (const seed of seededCollectionLoops(context)) {
    for (const declaration of context.variables) {
      const size = declarationName(declaration);
      if (!size || !declaration.initializer || !isDescendantOf(declaration, seed.loop)) continue;
      if (collectionLength(declaration.initializer, seed.collection)) models.push({ ...seed, size });
    }
  }
  return models;
}

function indexedCollection(expression: ts.Expression | undefined, collection: string, index: string): boolean {
  if (!expression) return false;
  const value = unwrapExpression(expression);
  return ts.isElementAccessExpression(value)
    && identifierName(value.expression) === collection
    && Boolean(value.argumentExpression && identifiers(value.argumentExpression).has(index));
}

function levelLoopModels(context: ValidationContext): LevelLoopModel[] {
  const models: LevelLoopModel[] = [];
  for (const sizeModel of sizeModels(context)) {
    for (const levelLoop of context.loops) {
      if (levelLoop === sizeModel.loop || !isDescendantOf(levelLoop, sizeModel.loop)) continue;
      const condition = loopCondition(levelLoop);
      if (!condition || !identifiers(condition).has(sizeModel.size)) continue;
      const indexCandidates = context.variables.filter((declaration) => declaration.initializer
        && isZero(declaration.initializer)
        && isDescendantOf(declaration, levelLoop));
      for (const indexDeclaration of indexCandidates) {
        const index = declarationName(indexDeclaration);
        if (!index || !identifiers(condition).has(index)) continue;
        if (!mutations(levelLoop).some((mutation) => mutation.name === index && mutation.direction === "increment")) continue;
        const nodeDeclaration = context.variables.find((declaration) => declaration.initializer
          && isDescendantOf(declaration, levelLoop)
          && indexedCollection(declaration.initializer, sizeModel.collection, index));
        const node = nodeDeclaration && declarationName(nodeDeclaration);
        if (node) models.push({ ...sizeModel, index, levelLoop, node });
      }
    }
  }
  return models;
}

function emptyArrayDeclarations(context: ValidationContext, ancestor: ts.Node): string[] {
  return context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    const initializer = declaration.initializer && unwrapExpression(declaration.initializer);
    return name
      && initializer
      && ts.isArrayLiteralExpression(initializer)
      && initializer.elements.length === 0
      && isDescendantOf(declaration, ancestor)
      ? [name]
      : [];
  });
}

const levelQueue: RuleValidator = (context) => seededCollectionLoops(context).length > 0;

const capturesLevelSize: RuleValidator = (context) => sizeModels(context).length > 0;

const levelLoop: RuleValidator = (context) => levelLoopModels(context).length > 0;

const breadthFirstChildVisits: RuleValidator = (context) => levelLoopModels(context).some((model) =>
  emptyArrayDeclarations(context, model.loop).some((nextQueue) => {
    const sides = pushedChildSides(context, nextQueue, model.node, model.levelLoop);
    return sides.has("left") && sides.has("right");
  }));

const replacesLevelQueue: RuleValidator = (context) => levelLoopModels(context).some((model) =>
  emptyArrayDeclarations(context, model.loop).some((nextQueue) => assignments(model.loop).some((assignment) =>
    assignment.name === model.collection
      && identifierName(assignment.value) === nextQueue
      && !isDescendantOf(assignment.node, model.levelLoop)
      && assignment.node.pos >= model.levelLoop.end)));

export const binaryTreeValidator: PatternValidator = {
  patternId: "binary-tree",
  variants: {
    "dfs-recursive": {
      "null-base-case": nullBaseCase,
      "recursive-child-visits": recursiveChildVisits,
    },
    "dfs-iterative": {
      "traversal-stack": traversalStack,
      "visits-tree-children": iterativeChildVisits,
    },
    "bfs-level-order": {
      "level-queue": levelQueue,
      "captures-level-size": capturesLevelSize,
      "level-loop": levelLoop,
      "visits-tree-children": breadthFirstChildVisits,
      "replaces-level-queue": replacesLevelQueue,
    },
  },
};
