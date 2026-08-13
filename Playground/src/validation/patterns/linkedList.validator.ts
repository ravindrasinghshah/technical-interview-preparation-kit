import ts from "typescript";
import type { LoopNode, ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  assignments,
  declarationName,
  loopCondition,
  walk,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface SeededPointer {
  name: string;
  seed: string;
}

interface ReverseSeed {
  current: string;
  previous: string;
}

interface ReverseModel extends ReverseSeed {
  loop: LoopNode;
  savedNext?: string;
  savedNextDeclaration?: ts.VariableDeclaration;
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

function isNullish(expression: ts.Expression | undefined): boolean {
  if (!expression) return false;
  const value = unwrapExpression(expression);
  return value.kind === ts.SyntaxKind.NullKeyword
    || (ts.isIdentifier(value) && value.text === "undefined")
    || (ts.isVoidExpression(value) && ts.isNumericLiteral(value.expression));
}

function memberDepth(expression: ts.Expression, base: string, member: string): number | null {
  let current = unwrapExpression(expression);
  let depth = 0;
  while (ts.isPropertyAccessExpression(current) && current.name.text === member) {
    depth += 1;
    current = unwrapExpression(current.expression);
  }
  return ts.isIdentifier(current) && current.text === base ? depth : null;
}

function conjunctionParts(expression: ts.Expression): ts.Expression[] {
  const value = unwrapExpression(expression);
  if (!ts.isBinaryExpression(value) || value.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) return [value];
  return [...conjunctionParts(value.left), ...conjunctionParts(value.right)];
}

function isPresenceCheck(expression: ts.Expression, binding: string, depth: number): boolean {
  const value = unwrapExpression(expression);
  if (memberDepth(value, binding, "next") === depth) return true;
  if (!ts.isBinaryExpression(value)) return false;
  const isInequality = value.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsToken
    || value.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken;
  if (!isInequality) return false;
  return (memberDepth(value.left, binding, "next") === depth && isNullish(value.right))
    || (isNullish(value.left) && memberDepth(value.right, binding, "next") === depth);
}

function hasFastGuard(condition: ts.Expression, fast: string): boolean {
  const value = unwrapExpression(condition);
  if (ts.isPropertyAccessChain(value) && value.questionDotToken
    && memberDepth(value, fast, "next") === 1) return true;
  const parts = conjunctionParts(condition);
  return parts.some((part) => isPresenceCheck(part, fast, 0))
    && parts.some((part) => isPresenceCheck(part, fast, 1));
}

function hasCurrentGuard(condition: ts.Expression, current: string): boolean {
  return isPresenceCheck(condition, current, 0);
}

function seededPointers(context: ValidationContext): SeededPointer[] {
  const parameters = new Set(context.parameters
    .map(declarationName)
    .filter((name): name is string => Boolean(name)));
  return context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    const seed = identifierName(declaration.initializer);
    return name && seed && parameters.has(seed) ? [{ name, seed }] : [];
  });
}

function groupedPointerPairs(context: ValidationContext): Array<[SeededPointer, SeededPointer]> {
  const candidates = seededPointers(context);
  const pairs: Array<[SeededPointer, SeededPointer]> = [];
  for (let firstIndex = 0; firstIndex < candidates.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < candidates.length; secondIndex += 1) {
      const first = candidates[firstIndex];
      const second = candidates[secondIndex];
      if (first.seed === second.seed) pairs.push([first, second]);
    }
  }
  return pairs;
}

function hasStep(loop: LoopNode, pointer: string, depth: number): boolean {
  return assignments(loop).some((assignment) => assignment.name === pointer
    && memberDepth(assignment.value, pointer, "next") === depth);
}

const fastSlowInitializers: RuleValidator = (context) => groupedPointerPairs(context).length > 0;

const fastSlowGuard: RuleValidator = (context) => groupedPointerPairs(context).some(([first, second]) => context.loops.some((loop) => {
  const condition = loopCondition(loop);
  return Boolean(condition && (hasFastGuard(condition, first.name) || hasFastGuard(condition, second.name)));
}));

const fastSlowSteps: RuleValidator = (context) => groupedPointerPairs(context).some(([first, second]) => context.loops.some((loop) => {
  const condition = loopCondition(loop);
  if (!condition) return false;
  const firstIsFast = hasFastGuard(condition, first.name)
    && hasStep(loop, first.name, 2)
    && hasStep(loop, second.name, 1);
  const secondIsFast = hasFastGuard(condition, second.name)
    && hasStep(loop, second.name, 2)
    && hasStep(loop, first.name, 1);
  return firstIsFast || secondIsFast;
}));

function reverseSeeds(context: ValidationContext): ReverseSeed[] {
  const currentPointers = seededPointers(context);
  const previousPointers = context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    return name && isNullish(declaration.initializer) ? [name] : [];
  });
  return currentPointers.flatMap(({ name: current }) => previousPointers
    .filter((previous) => previous !== current)
    .map((previous) => ({ current, previous })));
}

function reverseModels(context: ValidationContext): ReverseModel[] {
  const models: ReverseModel[] = [];
  for (const seed of reverseSeeds(context)) {
    for (const loop of context.loops) {
      const condition = loopCondition(loop);
      if (!condition || !hasCurrentGuard(condition, seed.current)) continue;
      const savedNext = context.variables.find((declaration) => {
        const name = declarationName(declaration);
        return Boolean(name
          && declaration.initializer
          && isDescendantOf(declaration, loop)
          && memberDepth(declaration.initializer, seed.current, "next") === 1);
      });
      models.push({
        ...seed,
        loop,
        savedNext: savedNext ? declarationName(savedNext) ?? undefined : undefined,
        savedNextDeclaration: savedNext,
      });
    }
  }
  return models;
}

function reversedLinkAssignment(model: ReverseModel): ts.BinaryExpression | null {
  let found: ts.BinaryExpression | null = null;
  walk(model.loop, (node) => {
    if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.EqualsToken) return;
    if (memberDepth(node.left, model.current, "next") === 1 && identifierName(node.right) === model.previous) found = node;
  });
  return found;
}

const reversalInitializers: RuleValidator = (context) => reverseSeeds(context).length > 0;

const savesNextNode: RuleValidator = (context) => reverseModels(context).some((model) => Boolean(model.savedNext));

const reversesListLink: RuleValidator = (context) => reverseModels(context).some((model) => Boolean(
  model.savedNext && model.savedNextDeclaration && reversedLinkAssignment(model)
    && model.savedNextDeclaration.getStart(context.source) < reversedLinkAssignment(model)!.getStart(context.source),
));

const advancesReversal: RuleValidator = (context) => reverseModels(context).some((model) => {
  const linkAssignment = reversedLinkAssignment(model);
  if (!model.savedNext || !model.savedNextDeclaration || !linkAssignment) return false;
  const loopAssignments = assignments(model.loop);
  const advancesPrevious = loopAssignments.find((assignment) => assignment.name === model.previous
    && identifierName(assignment.value) === model.current);
  const advancesCurrent = loopAssignments.find((assignment) => assignment.name === model.current
    && identifierName(assignment.value) === model.savedNext);
  return Boolean(advancesPrevious && advancesCurrent
    && model.savedNextDeclaration.getStart(context.source) < linkAssignment.getStart(context.source)
    && linkAssignment.getStart(context.source) < advancesPrevious.node.getStart(context.source)
    && advancesPrevious.node.getStart(context.source) < advancesCurrent.node.getStart(context.source));
});

const returnsPrevious: RuleValidator = (context) => reverseModels(context).some((model) => {
  const linkAssignment = reversedLinkAssignment(model);
  if (!model.savedNext || !model.savedNextDeclaration || !linkAssignment) return false;
  const loopAssignments = assignments(model.loop);
  const previousAdvance = loopAssignments.find((assignment) => assignment.name === model.previous
    && identifierName(assignment.value) === model.current);
  const currentAdvance = loopAssignments.find((assignment) => assignment.name === model.current
    && identifierName(assignment.value) === model.savedNext);
  if (!previousAdvance || !currentAdvance) return false;
  return context.returns.some((statement) => identifierName(statement.expression) === model.previous);
});

export const linkedListValidator: PatternValidator = {
  patternId: "linked-list",
  variants: {
    "fast-slow": {
      "fast-slow-initializers": fastSlowInitializers,
      "fast-slow-guard": fastSlowGuard,
      "fast-slow-steps": fastSlowSteps,
    },
    reverse: {
      "reversal-initializers": reversalInitializers,
      "saves-next-node": savesNextNode,
      "reverses-link": reversesListLink,
      "advances-reversal": advancesReversal,
      "returns-value": returnsPrevious,
    },
  },
};
