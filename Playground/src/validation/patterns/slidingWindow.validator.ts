import ts from "typescript";
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

const branchUsesWindow: RuleValidator = (context) => {
  const model = findWindowModel(context);
  if (!model) return false;
  return context.branches.some((branch) => {
    if (!isDescendantOf(branch, model.traversalLoop)) return false;
    const names = resolvedIdentifiers(branch.expression, context);
    return names.has(model.left) && names.has(model.right);
  });
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

function collectionName(declaration: ts.VariableDeclaration): string | null {
  const name = declarationName(declaration);
  const value = declaration.initializer;
  if (!name || !value || !ts.isNewExpression(value) || !ts.isIdentifier(value.expression)) return null;
  return value.expression.text === "Map" || value.expression.text === "Set" ? name : null;
}

function isCollectionUpdate(call: ts.CallExpression, collection: string): boolean {
  if (!ts.isPropertyAccessExpression(call.expression) || !ts.isIdentifier(call.expression.expression)) return false;
  return call.expression.expression.text === collection && ["set", "add", "delete"].includes(call.expression.name.text);
}

const frequencyCollection: RuleValidator = (context) => {
  const model = findWindowModel(context);
  if (!model) return false;
  const shrink = findShrinkLoop(context, model);
  if (!shrink) return false;
  const collections = context.variables.map(collectionName).filter((name): name is string => Boolean(name));
  return collections.some((collection) => {
    const enteringUpdate = context.calls.some((call) => isCollectionUpdate(call, collection)
      && isDescendantOf(call, model.traversalLoop)
      && !isDescendantOf(call, shrink));
    const leavingUpdate = context.calls.some((call) => isCollectionUpdate(call, collection) && isDescendantOf(call, shrink));
    return enteringUpdate && leavingUpdate;
  });
};

const shared = {
  "window-boundaries": windowBoundaries,
  "loop-with-comparison": traversalLoop,
  "same-direction-updates": boundariesAdvance,
};

export const slidingWindowValidator: PatternValidator = {
  patternId: "sliding-window",
  variants: {
    "fixed-window": { ...shared, "conditional-branch": branchUsesWindow },
    "variable-window": { ...shared, "window-shrink-loop": shrinkLoop },
    "frequency-window": { ...shared, "window-shrink-loop": shrinkLoop, "frequency-collection": frequencyCollection },
  },
};
