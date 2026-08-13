import ts from "typescript";
import type { RuleValidator } from "./types";
import { containsComparison, loopCondition } from "./ast/queries";

export const commonRuleValidators = {
  "loop-with-comparison": ((context) => context.loops.some((loop) => {
    const condition = loopCondition(loop);
    return Boolean(condition && containsComparison(condition));
  })) satisfies RuleValidator,
  "returns-value": ((context) => {
    if (context.returns.some((statement) => Boolean(statement.expression))) return true;
    const fn = context.primaryFunction;
    return Boolean(fn?.body && !ts.isBlock(fn.body));
  }) satisfies RuleValidator,
};
