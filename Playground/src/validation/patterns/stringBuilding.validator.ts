import ts from "typescript";
import type { ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import { callsWithin, declarationName, resolvedIdentifiers, walk } from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface StringTraversal {
  input: string;
  item: string;
  loop: ts.ForOfStatement;
}

const parameterNames = (context: ValidationContext): Set<string> => new Set(context.parameters
  .map(declarationName)
  .filter((name): name is string => Boolean(name)));

function forOfBinding(loop: ts.ForOfStatement): string | null {
  if (ts.isVariableDeclarationList(loop.initializer)) {
    return declarationName(loop.initializer.declarations[0]);
  }
  return ts.isIdentifier(loop.initializer) ? loop.initializer.text : null;
}

function findTraversals(context: ValidationContext): StringTraversal[] {
  const inputs = parameterNames(context);
  const traversals: StringTraversal[] = [];
  for (const loop of context.loops) {
    if (!ts.isForOfStatement(loop)) continue;
    const item = forOfBinding(loop);
    const input = [...resolvedIdentifiers(loop.expression, context)].find((name) => inputs.has(name));
    if (input && item) traversals.push({ input, item, loop });
  }
  return traversals;
}

function arrayAccumulators(context: ValidationContext): string[] {
  return context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    return name && declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)
      && declaration.initializer.elements.length === 0
      && !context.loops.some((loop) => isDescendantOf(declaration, loop))
      ? [name]
      : [];
  });
}

function stringAccumulators(context: ValidationContext): string[] {
  return context.variables.flatMap((declaration) => {
    const name = declarationName(declaration);
    const value = declaration.initializer;
    const isEmptyString = Boolean(value && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) && value.text === "");
    return name && isEmptyString && !context.loops.some((loop) => isDescendantOf(declaration, loop)) ? [name] : [];
  });
}

function isCallOn(call: ts.CallExpression, receiver: string, method: string): boolean {
  return ts.isPropertyAccessExpression(call.expression)
    && ts.isIdentifier(call.expression.expression)
    && call.expression.expression.text === receiver
    && call.expression.name.text === method;
}

function isEmptyString(expression: ts.Expression): boolean {
  return (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) && expression.text === "";
}

function isIdentifierNamed(expression: ts.Expression, name: string): boolean {
  let value = expression;
  while (ts.isParenthesizedExpression(value)
    || ts.isAsExpression(value)
    || ts.isTypeAssertionExpression(value)
    || ts.isNonNullExpression(value)) value = value.expression;
  return ts.isIdentifier(value) && value.text === name;
}

function returnsJoinedAccumulator(context: ValidationContext, accumulator: string): boolean {
  return context.returns.some((statement) => Boolean(statement.expression
    && callsWithin(statement.expression).some((call) => isCallOn(call, accumulator, "join")
      && call.arguments.length === 1 && isEmptyString(call.arguments[0]))));
}

function returnsAccumulator(context: ValidationContext, accumulator: string): boolean {
  return context.returns.some((statement) => Boolean(statement.expression
    && isIdentifierNamed(statement.expression, accumulator)));
}

const iteratesInput: RuleValidator = (context) => findTraversals(context).length > 0;

const arrayAccumulatorInitializer: RuleValidator = (context) => arrayAccumulators(context).length > 0;

const stringAccumulatorInitializer: RuleValidator = (context) => stringAccumulators(context).length > 0;

const appendsCharacter: RuleValidator = (context) => {
  const accumulators = arrayAccumulators(context);
  return findTraversals(context).some((traversal) => accumulators.some((accumulator) => {
    return callsWithin(traversal.loop.statement).some((call) => isCallOn(call, accumulator, "push")
      && call.arguments.length === 1
      && isIdentifierNamed(call.arguments[0], traversal.item)
      && returnsJoinedAccumulator(context, accumulator));
  }));
};

const joinsCharacters: RuleValidator = (context) => {
  const accumulators = new Set(arrayAccumulators(context));
  return context.returns.some((statement) => {
    if (!statement.expression) return false;
    return callsWithin(statement.expression).some((call) => ts.isPropertyAccessExpression(call.expression)
      && ts.isIdentifier(call.expression.expression)
      && accumulators.has(call.expression.expression.text)
      && call.expression.name.text === "join"
      && call.arguments.length === 1
      && isEmptyString(call.arguments[0]));
  });
};

function hasAppendAssignment(
  node: ts.Node,
  accumulator: string,
  item: string,
  context: ValidationContext,
): boolean {
  let found = false;
  walk(node, (current) => {
    if (!ts.isBinaryExpression(current) || !ts.isIdentifier(current.left) || current.left.text !== accumulator) return;
    if (current.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken
      && isIdentifierNamed(current.right, item)) {
      found = true;
      return;
    }
    if (current.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !ts.isBinaryExpression(current.right)
      || current.right.operatorToken.kind !== ts.SyntaxKind.PlusToken) return;
    if (ts.isIdentifier(current.right.left) && current.right.left.text === accumulator
      && isIdentifierNamed(current.right.right, item)) found = true;
  });
  return found;
}

const concatenatesCharacter: RuleValidator = (context) => {
  const accumulators = stringAccumulators(context);
  return findTraversals(context).some((traversal) => accumulators.some((accumulator) => {
    const declaration = context.variables.find((candidate) => declarationName(candidate) === accumulator);
    return Boolean(declaration && !isDescendantOf(declaration, traversal.loop)
      && hasAppendAssignment(traversal.loop.statement, accumulator, traversal.item, context)
      && returnsAccumulator(context, accumulator));
  }));
};

const returnsStringAccumulator: RuleValidator = (context) => {
  return stringAccumulators(context).some((accumulator) => returnsAccumulator(context, accumulator)
    && findTraversals(context).some((traversal) => hasAppendAssignment(
      traversal.loop.statement,
      accumulator,
      traversal.item,
      context,
    )));
};

export const stringBuildingValidator: PatternValidator = {
  patternId: "string-building",
  variants: {
    "array-join": {
      "accumulator-initializer": arrayAccumulatorInitializer,
      "iterates-input": iteratesInput,
      "appends-character": appendsCharacter,
      "joins-characters": joinsCharacters,
      "returns-value": joinsCharacters,
    },
    concatenation: {
      "accumulator-initializer": stringAccumulatorInitializer,
      "iterates-input": iteratesInput,
      "concatenates-character": concatenatesCharacter,
      "returns-value": returnsStringAccumulator,
    },
  },
};
