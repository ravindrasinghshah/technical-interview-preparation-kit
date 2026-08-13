import type { LoopNode, ValidationContext } from "../ast/context";
import { isDescendantOf } from "../ast/context";
import {
  containsComparison,
  declarationName,
  elementAccessIndices,
  isZero,
  loopCondition,
  mutations,
  referencesLength,
  resolvedIdentifiers,
} from "../ast/queries";
import type { PatternValidator, RuleValidator } from "../types";

interface WindowModel {
  left: string;
  right: string;
  traversalLoop: LoopNode;
}

const zeroVariables = (context: ValidationContext) => context.variables.flatMap((declaration) => {
  const name = declarationName(declaration);
  return name && isZero(declaration.initializer) ? [name] : [];
});

function findWindowModel(context: ValidationContext): WindowModel | null {
  const zeroNames = zeroVariables(context);
  for (const loop of context.loops) {
    const condition = loopCondition(loop);
    if (!condition || !containsComparison(condition) || !referencesLength(condition, context)) continue;
    const conditionNames = resolvedIdentifiers(condition, context);
    const changes = mutations(loop);
    const indices = elementAccessIndices(loop);
    for (const right of zeroNames) {
      if (!conditionNames.has(right) || !changes.some((item) => item.name === right && item.direction === "increment")) continue;
      for (const left of zeroNames) {
        if (left === right) continue;
        if (indices.has(left) && indices.has(right) && changes.some((item) => item.name === left && item.direction === "increment")) {
          return { left, right, traversalLoop: loop };
        }
      }
    }
  }
  return null;
}

function findShrinkLoop(context: ValidationContext, model: WindowModel): LoopNode | null {
  return context.loops.find((loop) => {
    if (loop === model.traversalLoop || !isDescendantOf(loop, model.traversalLoop)) return false;
    const condition = loopCondition(loop);
    return Boolean(condition && containsComparison(condition)
      && mutations(loop).some((item) => item.name === model.left && item.direction === "increment"));
  }) ?? null;
}

const windowBoundaries: RuleValidator = (context) => Boolean(findWindowModel(context));

const traversalLoop: RuleValidator = (context) => {
  const model = findWindowModel(context);
  const condition = model && loopCondition(model.traversalLoop);
  return Boolean(condition && containsComparison(condition) && referencesLength(condition, context));
};

const boundariesAdvance: RuleValidator = (context) => {
  const model = findWindowModel(context);
  if (!model) return false;
  const changes = mutations(model.traversalLoop);
  return changes.some((item) => item.name === model.left && item.direction === "increment")
    && changes.some((item) => item.name === model.right && item.direction === "increment");
};

const shrinkLoop: RuleValidator = (context) => {
  const model = findWindowModel(context);
  return Boolean(model && findShrinkLoop(context, model));
};

const shared = {
  "window-boundaries": windowBoundaries,
  "loop-with-comparison": traversalLoop,
  "same-direction-updates": boundariesAdvance,
};

export const slidingWindowValidator: PatternValidator = {
  patternId: "sliding-window",
  variants: {
    "variable-window": { ...shared, "window-shrink-loop": shrinkLoop },
  },
};
