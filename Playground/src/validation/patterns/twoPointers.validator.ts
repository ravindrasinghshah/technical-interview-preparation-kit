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
  referencesLength,
  resolvedIdentifiers,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface PointerModel {
  first: string;
  second: string;
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

function findForwardModel(context: ValidationContext): PointerModel | null {
  const starts = namedVariables(context).filter(({ declaration }) => isZero(declaration.initializer));
  for (const loop of context.loops) {
    const condition = loopCondition(loop);
    if (!condition || !containsComparison(condition) || !referencesLength(condition, context)) continue;
    const conditionNames = resolvedIdentifiers(condition, context);
    const loopMutations = mutations(loop);
    const indices = elementAccessIndices(loop);
    for (const explorer of starts) {
      if (!conditionNames.has(explorer.name) || !loopMutations.some((item) => item.name === explorer.name && item.direction === "increment")) continue;
      for (const writer of starts) {
        if (writer.name === explorer.name) continue;
        if (indices.has(writer.name) && indices.has(explorer.name) && loopMutations.some((item) => item.name === writer.name && item.direction === "increment")) {
          return { first: writer.name, second: explorer.name, loop };
        }
      }
    }
  }
  return null;
}

const modelFor = (context: ValidationContext, variant: string) => variant === "same-direction" ? findForwardModel(context) : findOppositeModel(context);

const hasModel: RuleValidator = (context, drill) => Boolean(modelFor(context, drill.validation.variant));

const relevantLoop: RuleValidator = (context, drill) => {
  const model = modelFor(context, drill.validation.variant);
  const condition = model && loopCondition(model.loop);
  return Boolean(condition && containsComparison(condition));
};

const relevantBranch: RuleValidator = (context, drill) => {
  const model = modelFor(context, drill.validation.variant);
  if (!model) return false;
  return context.branches.some((branch) => {
    if (!isDescendantOf(branch, model.loop)) return false;
    const dependencies = resolvedIdentifiers(branch.expression, context);
    if (drill.validation.variant === "same-direction") {
      return dependencies.has(model.second) && mutations(branch).some((item) => item.name === model.first);
    }
    return dependencies.has(model.first) && dependencies.has(model.second);
  });
};

const oppositeUpdates: RuleValidator = (context, drill) => {
  const model = modelFor(context, drill.validation.variant);
  if (!model) return false;
  const changes = mutations(model.loop);
  return changes.some((item) => item.name === model.first && item.direction === "increment")
    && changes.some((item) => item.name === model.second && item.direction === "decrement");
};

const forwardUpdates: RuleValidator = (context, drill) => {
  const model = modelFor(context, drill.validation.variant);
  if (!model) return false;
  const changes = mutations(model.loop);
  return changes.some((item) => item.name === model.first && item.direction === "increment")
    && changes.some((item) => item.name === model.second && item.direction === "increment");
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
    "same-direction": { ...shared, "same-direction-updates": forwardUpdates },
    "sorted-pair": { ...shared, "two-directional-updates": oppositeUpdates },
  },
};
