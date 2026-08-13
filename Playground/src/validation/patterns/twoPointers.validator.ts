import ts from "typescript";
import type { LoopNode, ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  containsComparison,
  declarationName,
  elementAccessIndices,
  isLengthMinusOne,
  isZero,
  loopCondition,
  mutations,
  resolvedIdentifiers,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface PointerModel {
  first: string;
  second: string;
  loop: LoopNode;
}

interface InputPointer {
  input: string;
  pointer: string;
}

interface TwoInputModel {
  first: InputPointer;
  second: InputPointer;
  loop: LoopNode;
}

const namedVariables = (context: ValidationContext) => context.variables.flatMap((declaration) => {
  const name = declarationName(declaration);
  return name ? [{ name, declaration }] : [];
});

function findOppositeModel(context: ValidationContext): PointerModel | null {
  const starts = namedVariables(context).filter(({ declaration }) => isZero(declaration.initializer));
  const ends = namedVariables(context).filter(({ declaration }) => isLengthMinusOne(declaration.initializer, context));
  for (const loop of context.loops) {
    const condition = loopCondition(loop);
    if (!condition || !containsComparison(condition)) continue;
    const conditionNames = resolvedIdentifiers(condition, context);
    const indices = elementAccessIndices(loop);
    for (const start of starts) {
      for (const end of ends) {
        if (start.name === end.name) continue;
        if (conditionNames.has(start.name) && conditionNames.has(end.name) && indices.has(start.name) && indices.has(end.name)) {
          return { first: start.name, second: end.name, loop };
        }
      }
    }
  }
  return null;
}

const parameterNames = (context: ValidationContext) => context.parameters
  .map(declarationName)
  .filter((name): name is string => Boolean(name));

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

function isIdentifierNamed(expression: ts.Expression, name: string): boolean {
  const value = unwrapExpression(expression);
  return ts.isIdentifier(value) && value.text === name;
}

function isInputLength(expression: ts.Expression, input: string): boolean {
  const value = unwrapExpression(expression);
  return ts.isPropertyAccessExpression(value)
    && value.name.text === "length"
    && isIdentifierNamed(value.expression, input);
}

function isPointerBeforeInputEnd(expression: ts.Expression, pointer: string, input: string): boolean {
  const value = unwrapExpression(expression);
  if (!ts.isBinaryExpression(value)) return false;
  const forwardComparison = value.operatorToken.kind === ts.SyntaxKind.LessThanToken;
  if (forwardComparison && isIdentifierNamed(value.left, pointer) && isInputLength(value.right, input)) return true;
  const reversedComparison = value.operatorToken.kind === ts.SyntaxKind.GreaterThanToken;
  return reversedComparison && isInputLength(value.left, input) && isIdentifierNamed(value.right, pointer);
}

function conjunctionParts(expression: ts.Expression): ts.Expression[] {
  const value = unwrapExpression(expression);
  if (!ts.isBinaryExpression(value) || value.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) return [value];
  return [...conjunctionParts(value.left), ...conjunctionParts(value.right)];
}

function inputPointerPairs(condition: ts.Expression, context: ValidationContext): InputPointer[] {
  const inputs = parameterNames(context);
  const pointers = namedVariables(context)
    .filter(({ declaration }) => isZero(declaration.initializer))
    .map(({ name }) => name);
  const parts = conjunctionParts(condition);
  const pairs: InputPointer[] = [];
  for (const pointer of pointers) {
    for (const input of inputs) {
      if (parts.some((part) => isPointerBeforeInputEnd(part, pointer, input))) pairs.push({ pointer, input });
    }
  }
  return pairs;
}

function findTwoInputModel(context: ValidationContext): TwoInputModel | null {
  for (const loop of context.loops) {
    const condition = loopCondition(loop);
    if (!condition) continue;
    const pairs = inputPointerPairs(condition, context);
    for (const first of pairs) {
      for (const second of pairs) {
        if (first.pointer === second.pointer || first.input === second.input) continue;
        return { first, second, loop };
      }
    }
  }
  return null;
}

function isOne(expression: ts.Expression): boolean {
  const value = unwrapExpression(expression);
  return ts.isNumericLiteral(value) && Number(value.text) === 1;
}

function advancesByOne(node: ts.Node, pointer: string): boolean {
  let found = false;
  const visit = (current: ts.Node): void => {
    if (current !== node && ts.isFunctionLike(current)) return;
    if ((ts.isPrefixUnaryExpression(current) || ts.isPostfixUnaryExpression(current))
      && current.operator === ts.SyntaxKind.PlusPlusToken
      && isIdentifierNamed(current.operand, pointer)) found = true;
    if (ts.isBinaryExpression(current) && isIdentifierNamed(current.left, pointer)) {
      if (current.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken && isOne(current.right)) found = true;
      if (current.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isBinaryExpression(current.right)
        && current.right.operatorToken.kind === ts.SyntaxKind.PlusToken) {
        const pointerThenOne = isIdentifierNamed(current.right.left, pointer) && isOne(current.right.right);
        const oneThenPointer = isOne(current.right.left) && isIdentifierNamed(current.right.right, pointer);
        if (pointerThenOne || oneThenPointer) found = true;
      }
    }
    ts.forEachChild(current, visit);
  };
  visit(node);
  return found;
}

function armAdvances(statement: ts.Statement | undefined, pointer: string): boolean {
  return Boolean(statement && advancesByOne(statement, pointer));
}

const twoInputInitializers: RuleValidator = (context) => {
  if (parameterNames(context).length < 2) return false;
  return namedVariables(context).filter(({ declaration }) => isZero(declaration.initializer)).length >= 2;
};

const jointTraversal: RuleValidator = (context) => Boolean(findTwoInputModel(context));

const jointBranch: RuleValidator = (context) => {
  const model = findTwoInputModel(context);
  if (!model) return false;
  return context.branches.some((branch) => {
    if (!isDescendantOf(branch, model.loop) || !branch.elseStatement) return false;
    const firstThen = armAdvances(branch.thenStatement, model.first.pointer);
    const secondThen = armAdvances(branch.thenStatement, model.second.pointer);
    const firstElse = armAdvances(branch.elseStatement, model.first.pointer);
    const secondElse = armAdvances(branch.elseStatement, model.second.pointer);
    return (firstThen && secondElse) || (secondThen && firstElse);
  });
};

const jointUpdates: RuleValidator = (context) => {
  const model = findTwoInputModel(context);
  if (!model) return false;
  return advancesByOne(model.loop, model.first.pointer) && advancesByOne(model.loop, model.second.pointer);
};

function matchingTailLoop(context: ValidationContext, model: TwoInputModel, pair: InputPointer): LoopNode | null {
  return context.loops.find((loop) => {
    if (loop === model.loop || isDescendantOf(loop, model.loop) || loop.end <= model.loop.end) return false;
    const condition = loopCondition(loop);
    return Boolean(condition
      && isPointerBeforeInputEnd(condition, pair.pointer, pair.input)
      && advancesByOne(loop, pair.pointer));
  }) ?? null;
}

const tailExhaustion: RuleValidator = (context) => {
  const model = findTwoInputModel(context);
  if (!model) return false;
  const firstTail = matchingTailLoop(context, model, model.first);
  const secondTail = matchingTailLoop(context, model, model.second);
  return Boolean(firstTail && secondTail && firstTail !== secondTail);
};

const hasModel: RuleValidator = (context) => Boolean(findOppositeModel(context));

const relevantLoop: RuleValidator = (context, drill) => {
  if (drill.validation.variant === "two-input-exhaustion") return jointTraversal(context, drill);
  const model = findOppositeModel(context);
  const condition = model && loopCondition(model.loop);
  return Boolean(condition && containsComparison(condition));
};

const relevantBranch: RuleValidator = (context, drill) => {
  if (drill.validation.variant === "two-input-exhaustion") return jointBranch(context, drill);
  const model = findOppositeModel(context);
  if (!model) return false;
  return context.branches.some((branch) => {
    if (!isDescendantOf(branch, model.loop)) return false;
    const dependencies = resolvedIdentifiers(branch.expression, context);
    return dependencies.has(model.first) && dependencies.has(model.second);
  });
};

const oppositeUpdates: RuleValidator = (context, drill) => {
  const model = findOppositeModel(context);
  if (!model) return false;
  const changes = mutations(model.loop);
  return changes.some((item) => item.name === model.first && item.direction === "increment")
    && changes.some((item) => item.name === model.second && item.direction === "decrement");
};

const shared = {
  "two-index-initializers": hasModel,
  "loop-with-comparison": relevantLoop,
  "conditional-branch": relevantBranch,
};

export const twoPointersValidator: PatternValidator = {
  patternId: "two-pointers",
  variants: {
    "opposite-ends": { ...shared, "two-directional-updates": oppositeUpdates },
    "two-input-exhaustion": {
      "two-index-initializers": twoInputInitializers,
      "joint-traversal": jointTraversal,
      "loop-with-comparison": jointTraversal,
      "conditional-branch": jointBranch,
      "same-direction-updates": jointUpdates,
      "tail-exhaustion": tailExhaustion,
    },
  },
};
