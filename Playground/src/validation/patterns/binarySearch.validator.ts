import type { LoopNode, ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  assignments,
  containsComparison,
  declarationName,
  expressionIsNamePlusOrMinusOne,
  hasHalvingOperation,
  identifiers,
  isLengthMinusOne,
  isZero,
  loopCondition,
  resolvedIdentifiers,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface BinarySearchModel {
  lower: string;
  upper: string;
  midpoint: string;
  loop: LoopNode;
}

const bindingNames = (context: ValidationContext) => new Set([
  ...context.variables.map(declarationName),
  ...context.parameters.map(declarationName),
].filter((name): name is string => Boolean(name)));

function findBinarySearchModel(context: ValidationContext): BinarySearchModel | null {
  const bindings = bindingNames(context);
  for (const loop of context.loops) {
    const condition = loopCondition(loop);
    if (!condition || !containsComparison(condition)) continue;
    const conditionNames = [...identifiers(condition)].filter((name) => bindings.has(name));
    const midpointDeclarations = context.variables.filter((declaration) => declaration.initializer
      && isDescendantOf(declaration, loop)
      && hasHalvingOperation(declaration.initializer));
    for (const declaration of midpointDeclarations) {
      const midpoint = declarationName(declaration);
      if (!midpoint || !declaration.initializer) continue;
      const midpointDependencies = identifiers(declaration.initializer);
      const bounds = conditionNames.filter((name) => midpointDependencies.has(name) && name !== midpoint);
      if (bounds.length < 2) continue;
      return { lower: bounds[0], upper: bounds[1], midpoint, loop };
    }
  }
  return null;
}

const initializedBoundaries: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  if (!model) return false;
  const lower = context.variables.find((declaration) => declarationName(declaration) === model.lower);
  const upper = context.variables.find((declaration) => declarationName(declaration) === model.upper);
  if (!lower || !upper) return false;
  return (isZero(lower.initializer) && isLengthMinusOne(upper.initializer, context))
    || (isZero(upper.initializer) && isLengthMinusOne(lower.initializer, context));
};

const comparisonLoop: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  if (!model) return false;
  const condition = loopCondition(model.loop);
  const names = condition && identifiers(condition);
  return Boolean(condition && names?.has(model.lower) && names.has(model.upper) && containsComparison(condition));
};

const midpoint: RuleValidator = (context) => Boolean(findBinarySearchModel(context));

const midpointBranch: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  if (!model) return false;
  return context.branches.some((branch) => isDescendantOf(branch, model.loop)
    && resolvedIdentifiers(branch.expression, context).has(model.midpoint));
};

const boundaryUpdates: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  if (!model) return false;
  const updates = assignments(model.loop);
  const plusUpdate = updates.some((item) => [model.lower, model.upper].includes(item.name)
    && expressionIsNamePlusOrMinusOne(item.value, model.midpoint, "increment"));
  const minusUpdate = updates.some((item) => [model.lower, model.upper].includes(item.name)
    && expressionIsNamePlusOrMinusOne(item.value, model.midpoint, "decrement"));
  const updatedNames = new Set(updates.filter((item) => [model.lower, model.upper].includes(item.name)).map((item) => item.name));
  return plusUpdate && minusUpdate && updatedNames.has(model.lower) && updatedNames.has(model.upper);
};

function candidateName(context: ValidationContext, model: BinarySearchModel): string | null {
  const candidates = context.variables.filter((declaration) => {
    const name = declarationName(declaration);
    return name && name !== model.lower && name !== model.upper && name !== model.midpoint && !isDescendantOf(declaration, model.loop);
  });
  const loopAssignments = assignments(model.loop);
  for (const declaration of candidates) {
    const name = declarationName(declaration)!;
    const assignedMidpoint = loopAssignments.some((item) => item.name === name && resolvedIdentifiers(item.value, context).has(model.midpoint));
    const returned = context.returns.some((statement) => statement.expression && resolvedIdentifiers(statement.expression, context).has(name));
    if (assignedMidpoint && returned) return name;
  }
  return null;
}

const tracksCandidate: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  return Boolean(model && candidateName(context, model));
};

const predicateCall: RuleValidator = (context) => {
  const model = findBinarySearchModel(context);
  if (!model) return false;
  return context.branches.some((branch) => isDescendantOf(branch, model.loop) && context.calls.some((call) => {
    if (call !== branch.expression && !isDescendantOf(call, branch.expression)) return false;
    return call.arguments.some((argument) => resolvedIdentifiers(argument, context).has(model.midpoint));
  }));
};

const shared = {
  "loop-with-comparison": comparisonLoop,
  "binary-midpoint": midpoint,
  "binary-boundary-updates": boundaryUpdates,
};

export const binarySearchValidator: PatternValidator = {
  patternId: "binary-search",
  variants: {
    "exact-match": { ...shared, "two-index-initializers": initializedBoundaries, "conditional-branch": midpointBranch },
    "boundary-search": { ...shared, "two-index-initializers": initializedBoundaries, "tracks-candidate": tracksCandidate },
    "answer-space": { ...shared, "tracks-candidate": tracksCandidate, "predicate-call": predicateCall },
  },
};
