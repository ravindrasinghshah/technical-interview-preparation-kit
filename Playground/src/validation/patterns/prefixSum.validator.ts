import ts from "typescript";
import type { ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  callsWithin,
  declarationName,
  isZero,
  mutations,
  resolvedIdentifiers,
  walk,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface PrefixSeed {
  input: string;
  prefix: string;
  declaration: ts.VariableDeclaration;
}

interface IndexedTraversal {
  index: string;
  loop: ts.ForStatement;
}

interface ForOfTraversal {
  input: string;
  item: string;
  loop: ts.ForOfStatement;
}

interface FrequencySeed {
  map: string;
  declaration: ts.VariableDeclaration;
  seedCall: ts.CallExpression;
}

interface FrequencyModel {
  answer: string;
  current: string;
  currentUpdate: ts.BinaryExpression;
  countUpdate: ts.BinaryExpression;
  mapUpdate: ts.CallExpression;
  seed: FrequencySeed;
  traversal: ForOfTraversal;
}

const numericValue = (expression: ts.Expression | undefined): number | null => {
  if (!expression) return null;
  if (ts.isParenthesizedExpression(expression)) return numericValue(expression.expression);
  if (ts.isNumericLiteral(expression)) return Number(expression.text);
  return null;
};

function unwrapExpression(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isTypeAssertionExpression(current)
    || ts.isNonNullExpression(current)) current = current.expression;
  return current;
}

const parameterNames = (context: ValidationContext): string[] => context.parameters
  .map(declarationName)
  .filter((name): name is string => Boolean(name));

function isIdentifierNamed(expression: ts.Expression, name: string): boolean {
  const value = unwrapExpression(expression);
  return ts.isIdentifier(value) && value.text === name;
}

function isPropertyOf(expression: ts.Expression, receiver: string, property: string): boolean {
  return ts.isPropertyAccessExpression(expression)
    && isIdentifierNamed(expression.expression, receiver)
    && expression.name.text === property;
}

function isCallOn(call: ts.CallExpression, receiver: string, method: string): boolean {
  return ts.isPropertyAccessExpression(call.expression)
    && isIdentifierNamed(call.expression.expression, receiver)
    && call.expression.name.text === method;
}

function isInputAt(expression: ts.Expression, input: string, index: string | number): boolean {
  if (!ts.isElementAccessExpression(expression) || !isIdentifierNamed(expression.expression, input) || !expression.argumentExpression) {
    return false;
  }
  return typeof index === "number"
    ? numericValue(expression.argumentExpression) === index
    : isIdentifierNamed(expression.argumentExpression, index);
}

function findPrefixSeeds(context: ValidationContext): PrefixSeed[] {
  const inputs = new Set(parameterNames(context));
  const seeds: PrefixSeed[] = [];
  for (const declaration of context.variables) {
    const prefix = declarationName(declaration);
    const initializer = declaration.initializer;
    if (!prefix || !initializer || !ts.isArrayLiteralExpression(initializer) || initializer.elements.length !== 1) continue;
    const first = initializer.elements[0];
    if (!ts.isExpression(first)) continue;
    for (const input of inputs) {
      if (isInputAt(first, input, 0)) seeds.push({ input, prefix, declaration });
    }
  }
  return seeds;
}

function isInputLengthBound(expression: ts.Expression, input: string): boolean {
  if (isPropertyOf(expression, input, "length")) return true;
  return ts.isBinaryExpression(expression)
    && expression.operatorToken.kind === ts.SyntaxKind.MinusToken
    && isPropertyOf(expression.left, input, "length")
    && numericValue(expression.right) === 1;
}

function conditionUsesIndexAndInputLength(condition: ts.Expression, index: string, input: string): boolean {
  if (!ts.isBinaryExpression(condition)) return false;
  const indexOnLeft = isIdentifierNamed(condition.left, index) && isInputLengthBound(condition.right, input);
  const indexOnRight = isIdentifierNamed(condition.right, index) && isInputLengthBound(condition.left, input);
  return (indexOnLeft && [ts.SyntaxKind.LessThanToken, ts.SyntaxKind.LessThanEqualsToken].includes(condition.operatorToken.kind))
    || (indexOnRight && [ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.GreaterThanEqualsToken].includes(condition.operatorToken.kind));
}

function indexedTraversal(context: ValidationContext, seed: PrefixSeed): IndexedTraversal | null {
  for (const loop of context.loops) {
    if (!ts.isForStatement(loop) || !loop.initializer || !ts.isVariableDeclarationList(loop.initializer) || !loop.condition || !loop.incrementor) {
      continue;
    }
    for (const declaration of loop.initializer.declarations) {
      const index = declarationName(declaration);
      if (!index || numericValue(declaration.initializer) !== 1) continue;
      if (!conditionUsesIndexAndInputLength(loop.condition, index, seed.input)) continue;
      if (!mutations(loop.incrementor).some((mutation) => mutation.name === index && mutation.direction === "increment")) continue;
      return { index, loop };
    }
  }
  return null;
}

function isPreviousPrefixElement(expression: ts.Expression, prefix: string, indexName: string): boolean {
  if (!ts.isElementAccessExpression(expression) || !isIdentifierNamed(expression.expression, prefix) || !expression.argumentExpression) {
    return false;
  }
  const index = expression.argumentExpression;
  const lastCollectionValue = ts.isBinaryExpression(index)
    && index.operatorToken.kind === ts.SyntaxKind.MinusToken
    && isPropertyOf(index.left, prefix, "length")
    && numericValue(index.right) === 1;
  const previousIndexedValue = ts.isBinaryExpression(index)
    && index.operatorToken.kind === ts.SyntaxKind.MinusToken
    && isIdentifierNamed(index.left, indexName)
    && numericValue(index.right) === 1;
  return lastCollectionValue || previousIndexedValue;
}

function subtreeContains(node: ts.Node, predicate: (candidate: ts.Node) => boolean): boolean {
  let found = false;
  walk(node, (candidate) => {
    if (predicate(candidate)) found = true;
  });
  return found;
}

function combinesPreviousPrefixAndCurrentInput(
  expression: ts.Expression,
  seed: PrefixSeed,
  traversal: IndexedTraversal,
): boolean {
  let found = false;
  walk(expression, (node) => {
    if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return;
    const leftHasPrevious = subtreeContains(node.left, (candidate) => ts.isExpression(candidate)
      && isPreviousPrefixElement(candidate, seed.prefix, traversal.index));
    const rightHasPrevious = subtreeContains(node.right, (candidate) => ts.isExpression(candidate)
      && isPreviousPrefixElement(candidate, seed.prefix, traversal.index));
    const leftHasCurrent = subtreeContains(node.left, (candidate) => ts.isExpression(candidate)
      && isInputAt(candidate, seed.input, traversal.index));
    const rightHasCurrent = subtreeContains(node.right, (candidate) => ts.isExpression(candidate)
      && isInputAt(candidate, seed.input, traversal.index));
    if ((leftHasPrevious && rightHasCurrent) || (rightHasPrevious && leftHasCurrent)) found = true;
  });
  return found;
}

function assignsCurrentPrefix(
  node: ts.Node,
  seed: PrefixSeed,
  traversal: IndexedTraversal,
): boolean {
  let found = false;
  walk(node, (candidate) => {
    if (!ts.isBinaryExpression(candidate) || candidate.operatorToken.kind !== ts.SyntaxKind.EqualsToken
      || !ts.isElementAccessExpression(candidate.left) || !candidate.left.argumentExpression) return;
    if (!isIdentifierNamed(candidate.left.expression, seed.prefix)
      || !isIdentifierNamed(candidate.left.argumentExpression, traversal.index)) return;
    if (combinesPreviousPrefixAndCurrentInput(candidate.right, seed, traversal)) found = true;
  });
  return found;
}

const prefixSeed: RuleValidator = (context) => findPrefixSeeds(context).length > 0;

const prefixAccumulation: RuleValidator = (context) => findPrefixSeeds(context).some((seed) => {
  const traversal = indexedTraversal(context, seed);
  if (!traversal) return false;
  const pushesNextPrefix = callsWithin(traversal.loop.statement).some((call) => isCallOn(call, seed.prefix, "push")
    && call.arguments.length === 1
    && combinesPreviousPrefixAndCurrentInput(call.arguments[0], seed, traversal));
  return pushesNextPrefix || assignsCurrentPrefix(traversal.loop.statement, seed, traversal);
});

const returnsPrefix: RuleValidator = (context) => findPrefixSeeds(context).some((seed) => context.returns.some((statement) => {
  const traversal = indexedTraversal(context, seed);
  if (!traversal) return false;
  const accumulates = callsWithin(traversal.loop.statement).some((call) => isCallOn(call, seed.prefix, "push")
    && call.arguments.length === 1
    && combinesPreviousPrefixAndCurrentInput(call.arguments[0], seed, traversal))
    || assignsCurrentPrefix(traversal.loop.statement, seed, traversal);
  return Boolean(accumulates && statement.expression && isIdentifierNamed(statement.expression, seed.prefix));
}));

function findFrequencySeeds(context: ValidationContext): FrequencySeed[] {
  const results: FrequencySeed[] = [];
  for (const declaration of context.variables) {
    const map = declarationName(declaration);
    const initializer = declaration.initializer;
    if (!map || !initializer || !ts.isNewExpression(initializer) || !ts.isIdentifier(initializer.expression)
      || initializer.expression.text !== "Map") continue;
    for (const call of context.calls) {
      const seeded = call.getStart(context.source) > declaration.getStart(context.source)
        && !context.loops.some((loop) => isDescendantOf(call, loop))
        && isCallOn(call, map, "set")
        && call.arguments.length >= 2
        && numericValue(call.arguments[0]) === 0
        && numericValue(call.arguments[1]) === 1;
      if (seeded) results.push({ map, declaration, seedCall: call });
    }
  }
  return results;
}

function forOfBinding(loop: ts.ForOfStatement): string | null {
  if (ts.isVariableDeclarationList(loop.initializer)) {
    return declarationName(loop.initializer.declarations[0]);
  }
  return ts.isIdentifier(loop.initializer) ? loop.initializer.text : null;
}

function inputTraversal(context: ValidationContext): ForOfTraversal[] {
  const inputs = new Set(parameterNames(context));
  const results: ForOfTraversal[] = [];
  for (const loop of context.loops) {
    if (!ts.isForOfStatement(loop)) continue;
    const item = forOfBinding(loop);
    const input = [...resolvedIdentifiers(loop.expression, context)].find((name) => inputs.has(name));
    if (item && input) results.push({ input, item, loop });
  }
  return results;
}

function containsMapGet(expression: ts.Expression, map: string, key: (expression: ts.Expression) => boolean): boolean {
  let found = false;
  walk(expression, (node) => {
    if (ts.isCallExpression(node) && isCallOn(node, map, "get") && node.arguments[0] && key(node.arguments[0])) found = true;
  });
  return found;
}

function containsOneIncrementFromMapGet(expression: ts.Expression, map: string, current: string): boolean {
  const value = unwrapExpression(expression);
  if (!ts.isBinaryExpression(value) || value.operatorToken.kind !== ts.SyntaxKind.PlusToken) return false;
  const isCurrentCount = (candidate: ts.Expression): boolean => {
    const unwrapped = unwrapExpression(candidate);
    if (ts.isCallExpression(unwrapped)) {
      return isCallOn(unwrapped, map, "get") && Boolean(unwrapped.arguments[0]
        && isIdentifierNamed(unwrapped.arguments[0], current));
    }
    if (!ts.isBinaryExpression(unwrapped)
      || ![ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken].includes(unwrapped.operatorToken.kind)
      || numericValue(unwrapped.right) !== 0) return false;
    return isCurrentCount(unwrapped.left);
  };
  return (numericValue(value.left) === 1 && isCurrentCount(value.right))
    || (numericValue(value.right) === 1 && isCurrentCount(value.left));
}

function hasFrequencyIncrement(
  expression: ts.Expression,
  map: string,
  current: string,
  targets: Set<string>,
): boolean {
  const isTargetLookup = (candidate: ts.Expression): boolean => {
    const value = unwrapExpression(candidate);
    return ts.isCallExpression(value)
      && isCallOn(value, map, "get")
      && Boolean(value.arguments[0]
        && ts.isBinaryExpression(value.arguments[0])
        && value.arguments[0].operatorToken.kind === ts.SyntaxKind.MinusToken
        && isIdentifierNamed(value.arguments[0].left, current)
        && ts.isIdentifier(unwrapExpression(value.arguments[0].right))
        && targets.has((unwrapExpression(value.arguments[0].right) as ts.Identifier).text));
  };
  const value = unwrapExpression(expression);
  if (isTargetLookup(value)) return true;
  return ts.isBinaryExpression(value)
    && [ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken].includes(value.operatorToken.kind)
    && numericValue(value.right) === 0
    && isTargetLookup(value.left);
}

function findAccumulatorUpdates(
  context: ValidationContext,
  traversal: ForOfTraversal,
  map: string,
  current: string,
): Array<{ answer: string; node: ts.BinaryExpression }> {
  const zeroAccumulators = new Set(context.variables
    .filter((declaration) => isZero(declaration.initializer) && !isDescendantOf(declaration, traversal.loop))
    .map(declarationName)
    .filter((name): name is string => Boolean(name) && name !== current));
  const targets = new Set(parameterNames(context).filter((name) => name !== traversal.input));
  const results: Array<{ answer: string; node: ts.BinaryExpression }> = [];
  walk(traversal.loop.statement, (node) => {
    if (!ts.isBinaryExpression(node) || !ts.isIdentifier(node.left) || !zeroAccumulators.has(node.left.text)) return;
    if (node.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken
      && hasFrequencyIncrement(node.right, map, current, targets)) {
      results.push({ answer: node.left.text, node });
      return;
    }
    if (node.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !ts.isBinaryExpression(node.right)
      || node.right.operatorToken.kind !== ts.SyntaxKind.PlusToken) return;
    const name = node.left.text;
    const leftKeepsAccumulator = isIdentifierNamed(node.right.left, name)
      && hasFrequencyIncrement(node.right.right, map, current, targets);
    const rightKeepsAccumulator = isIdentifierNamed(node.right.right, name)
      && hasFrequencyIncrement(node.right.left, map, current, targets);
    if (leftKeepsAccumulator || rightKeepsAccumulator) results.push({ answer: name, node });
  });
  return results;
}

function findCurrentUpdates(
  context: ValidationContext,
  traversal: ForOfTraversal,
  current: string,
): ts.BinaryExpression[] {
  const results: ts.BinaryExpression[] = [];
  walk(traversal.loop.statement, (node) => {
    if (!ts.isBinaryExpression(node) || !ts.isIdentifier(node.left) || node.left.text !== current) return;
    if (node.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken
      && isIdentifierNamed(node.right, traversal.item)) {
      results.push(node);
      return;
    }
    if (node.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !ts.isBinaryExpression(node.right)
      || node.right.operatorToken.kind !== ts.SyntaxKind.PlusToken) return;
    const leftKeepsCurrent = isIdentifierNamed(node.right.left, current)
      && isIdentifierNamed(node.right.right, traversal.item);
    const rightKeepsCurrent = isIdentifierNamed(node.right.right, current)
      && isIdentifierNamed(node.right.left, traversal.item);
    if (leftKeepsCurrent || rightKeepsCurrent) results.push(node);
  });
  return results;
}

function findFrequencyModels(context: ValidationContext): FrequencyModel[] {
  const models: FrequencyModel[] = [];
  for (const seed of findFrequencySeeds(context)) {
    for (const traversal of inputTraversal(context)) {
      if (seed.seedCall.getStart(context.source) >= traversal.loop.getStart(context.source)) continue;
      const zeroVariables = new Set(context.variables
        .filter((declaration) => isZero(declaration.initializer)
          && !isDescendantOf(declaration, traversal.loop)
          && declaration.getStart(context.source) < traversal.loop.getStart(context.source))
        .map(declarationName)
        .filter((name): name is string => Boolean(name)));
      for (const mapUpdate of callsWithin(traversal.loop.statement)) {
        if (!isCallOn(mapUpdate, seed.map, "set") || mapUpdate.arguments.length < 2 || !ts.isIdentifier(mapUpdate.arguments[0])) continue;
        const current = mapUpdate.arguments[0].text;
        if (!zeroVariables.has(current)
          || !containsOneIncrementFromMapGet(mapUpdate.arguments[1], seed.map, current)) continue;
        const currentUpdates = findCurrentUpdates(context, traversal, current);
        const countUpdates = findAccumulatorUpdates(context, traversal, seed.map, current);
        for (const currentUpdate of currentUpdates) {
          for (const countUpdate of countUpdates) {
            if (currentUpdate.pos < countUpdate.node.pos && countUpdate.node.pos < mapUpdate.pos) {
              models.push({
                answer: countUpdate.answer,
                current,
                currentUpdate,
                countUpdate: countUpdate.node,
                mapUpdate,
                seed,
                traversal,
              });
            }
          }
        }
      }
    }
  }
  return models;
}

const frequencyMapSeed: RuleValidator = (context) => findFrequencySeeds(context).some((seed) => inputTraversal(context).some(
  (traversal) => seed.seedCall.getStart(context.source) < traversal.loop.getStart(context.source),
));

const iteratesInput: RuleValidator = (context) => inputTraversal(context).length > 0;

const prefixFrequencyCount: RuleValidator = (context) => findFrequencyModels(context).length > 0;

const returnsFrequencyAnswer: RuleValidator = (context) => findFrequencyModels(context).some((model) => {
  return context.returns.some((statement) => Boolean(statement.expression
    && resolvedIdentifiers(statement.expression, context).has(model.answer)));
});

export const prefixSumValidator: PatternValidator = {
  patternId: "prefix-sum",
  variants: {
    "prefix-array": {
      "prefix-seed": prefixSeed,
      "prefix-accumulation": prefixAccumulation,
      "returns-value": returnsPrefix,
    },
    "frequency-map-count": {
      "frequency-map-seed": frequencyMapSeed,
      "iterates-input": iteratesInput,
      "prefix-frequency-count": prefixFrequencyCount,
      "returns-value": returnsFrequencyAnswer,
    },
  },
};
