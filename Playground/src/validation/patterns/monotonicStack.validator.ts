import ts from "typescript";
import type { ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import { callsWithin, declarationName, resolvedIdentifiers, walk } from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface StackTraversal {
  stack: string;
  input: string;
  item: string;
  loop: ts.ForOfStatement;
}

interface ShrinkModel extends StackTraversal {
  shrink: ts.WhileStatement | ts.DoStatement;
}

function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current)) current = current.expression;
  return current;
}

const numericValue = (expression: ts.Expression): number | null => {
  const value = unwrap(expression);
  return ts.isNumericLiteral(value) ? Number(value.text) : null;
};

const parameterNames = (context: ValidationContext): Set<string> => new Set(context.parameters
  .map(declarationName)
  .filter((name): name is string => Boolean(name)));

function stackNames(context: ValidationContext): string[] {
  return context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    return name && declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)
      && declaration.initializer.elements.length === 0
      ? [name]
      : [];
  });
}

function forOfBinding(loop: ts.ForOfStatement): string | null {
  if (ts.isVariableDeclarationList(loop.initializer)) {
    return declarationName(loop.initializer.declarations[0]);
  }
  return ts.isIdentifier(loop.initializer) ? loop.initializer.text : null;
}

function traversals(context: ValidationContext): StackTraversal[] {
  const inputs = parameterNames(context);
  const stacks = stackNames(context);
  const results: StackTraversal[] = [];
  for (const loop of context.loops) {
    if (!ts.isForOfStatement(loop)) continue;
    const item = forOfBinding(loop);
    const input = [...resolvedIdentifiers(loop.expression, context)].find((name) => inputs.has(name));
    if (!item || !input) continue;
    for (const stack of stacks) {
      const declaration = context.variables.find((candidate) => declarationName(candidate) === stack);
      if (declaration && !isDescendantOf(declaration, loop)) results.push({ stack, input, item, loop });
    }
  }
  return results;
}

function isStackLength(expression: ts.Expression, stack: string): boolean {
  const value = unwrap(expression);
  return ts.isPropertyAccessExpression(value)
    && ts.isIdentifier(value.expression)
    && value.expression.text === stack
    && value.name.text === "length";
}

function hasNonEmptyGuard(expression: ts.Expression, stack: string): boolean {
  const value = unwrap(expression);
  if (isStackLength(value, stack)) return true;
  if (!ts.isBinaryExpression(value)) return false;

  if (value.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    return hasNonEmptyGuard(value.left, stack) || hasNonEmptyGuard(value.right, stack);
  }
  if (value.operatorToken.kind === ts.SyntaxKind.BarBarToken) return false;

  const leftLength = isStackLength(value.left, stack);
  const rightLength = isStackLength(value.right, stack);
  const leftNumber = numericValue(value.left);
  const rightNumber = numericValue(value.right);
  if (leftLength && rightNumber !== null) {
    return (value.operatorToken.kind === ts.SyntaxKind.GreaterThanToken && rightNumber === 0)
      || (value.operatorToken.kind === ts.SyntaxKind.GreaterThanEqualsToken && rightNumber >= 1)
      || ([ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(value.operatorToken.kind)
        && rightNumber === 0);
  }
  if (rightLength && leftNumber !== null) {
    return (value.operatorToken.kind === ts.SyntaxKind.LessThanToken && leftNumber === 0)
      || (value.operatorToken.kind === ts.SyntaxKind.LessThanEqualsToken && leftNumber >= 1)
      || ([ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(value.operatorToken.kind)
        && leftNumber === 0);
  }
  return false;
}

function conjunctionParts(expression: ts.Expression): ts.Expression[] {
  const value = unwrap(expression);
  if (!ts.isBinaryExpression(value) || value.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) return [value];
  return [...conjunctionParts(value.left), ...conjunctionParts(value.right)];
}

function isLastStackElement(expression: ts.Expression, stack: string): boolean {
  const value = unwrap(expression);
  if (!ts.isElementAccessExpression(value) || !ts.isIdentifier(value.expression)
    || value.expression.text !== stack || !value.argumentExpression) return false;
  const index = unwrap(value.argumentExpression);
  return ts.isBinaryExpression(index)
    && index.operatorToken.kind === ts.SyntaxKind.MinusToken
    && isStackLength(index.left, stack)
    && numericValue(index.right) === 1;
}

function sideUsesItem(expression: ts.Expression, item: string, context: ValidationContext): boolean {
  return resolvedIdentifiers(expression, context).has(item);
}

function hasIncreasingComparison(
  expression: ts.Expression,
  stack: string,
  item: string,
  context: ValidationContext,
): boolean {
  let found = false;
  walk(expression, (node) => {
    if (!ts.isBinaryExpression(node)) return;
    const topOnLeft = isLastStackElement(node.left, stack) && sideUsesItem(node.right, item, context);
    const topOnRight = isLastStackElement(node.right, stack) && sideUsesItem(node.left, item, context);
    if (topOnLeft && [ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.GreaterThanEqualsToken].includes(node.operatorToken.kind)) {
      found = true;
    }
    if (topOnRight && [ts.SyntaxKind.LessThanToken, ts.SyntaxKind.LessThanEqualsToken].includes(node.operatorToken.kind)) {
      found = true;
    }
  });
  return found;
}

function hasGuardedIncreasingComparison(
  expression: ts.Expression,
  stack: string,
  item: string,
  context: ValidationContext,
): boolean {
  const parts = conjunctionParts(expression);
  const guardIndex = parts.findIndex((part) => hasNonEmptyGuard(part, stack));
  const comparisonIndex = parts.findIndex((part) => hasIncreasingComparison(part, stack, item, context));
  return guardIndex >= 0 && comparisonIndex > guardIndex;
}

function shrinkModels(context: ValidationContext): ShrinkModel[] {
  const results: ShrinkModel[] = [];
  for (const traversal of traversals(context)) {
    for (const loop of context.loops) {
      if ((!ts.isWhileStatement(loop) && !ts.isDoStatement(loop)) || !isDescendantOf(loop, traversal.loop)) continue;
      if (hasGuardedIncreasingComparison(loop.expression, traversal.stack, traversal.item, context)) {
        results.push({ ...traversal, shrink: loop });
      }
    }
  }
  return results;
}

function isCallOn(call: ts.CallExpression, receiver: string, method: string): boolean {
  return ts.isPropertyAccessExpression(call.expression)
    && ts.isIdentifier(call.expression.expression)
    && call.expression.expression.text === receiver
    && call.expression.name.text === method;
}

function isDirectLoopStatement(call: ts.CallExpression, loop: ts.WhileStatement | ts.DoStatement | ts.ForOfStatement): boolean {
  if (!ts.isExpressionStatement(call.parent)) return false;
  if (loop.statement === call.parent) return true;
  return ts.isBlock(loop.statement) && call.parent.parent === loop.statement;
}

const stackInitializer: RuleValidator = (context) => stackNames(context).length > 0;

const iteratesInput: RuleValidator = (context) => traversals(context).length > 0;

const monotonicShrinkLoop: RuleValidator = (context) => shrinkModels(context).length > 0;

const stackPop: RuleValidator = (context) => shrinkModels(context).some((model) => {
  return callsWithin(model.shrink.statement).some((call) => isCallOn(call, model.stack, "pop")
    && call.arguments.length === 0
    && isDirectLoopStatement(call, model.shrink));
});

const stackPush: RuleValidator = (context) => shrinkModels(context).some((model) => {
  return callsWithin(model.loop.statement).some((call) => isCallOn(call, model.stack, "push")
    && !isDescendantOf(call, model.shrink)
    && call.getStart(context.source) >= model.shrink.end
    && call.arguments.length === 1
    && resolvedIdentifiers(call.arguments[0], context).has(model.item)
    && isDirectLoopStatement(call, model.loop));
});

export const monotonicStackValidator: PatternValidator = {
  patternId: "monotonic-stack",
  variants: {
    "increasing-stack": {
      "stack-initializer": stackInitializer,
      "iterates-input": iteratesInput,
      "monotonic-shrink-loop": monotonicShrinkLoop,
      "stack-pop": stackPop,
      "stack-push": stackPush,
    },
  },
};
