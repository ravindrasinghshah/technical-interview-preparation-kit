import type { TemplateDrill, ValidationRuleId } from "../types";
import { commonRuleValidators } from "./common.validator";
import { binarySearchValidator } from "./patterns/binarySearch.validator";
import { slidingWindowValidator } from "./patterns/slidingWindow.validator";
import { twoPointersValidator } from "./patterns/twoPointers.validator";
import type { PatternValidator, RuleValidator } from "./types";

const patternValidators = new Map<string, PatternValidator>([
  [twoPointersValidator.patternId, twoPointersValidator],
  [slidingWindowValidator.patternId, slidingWindowValidator],
  [binarySearchValidator.patternId, binarySearchValidator],
]);

const commonRules: Partial<Record<ValidationRuleId, RuleValidator>> = commonRuleValidators;

export interface ValidatorResolution {
  rules: Map<ValidationRuleId, RuleValidator>;
  errors: string[];
}

export function resolveValidators(drill: TemplateDrill): ValidatorResolution {
  const errors: string[] = [];
  const rules = new Map<ValidationRuleId, RuleValidator>();
  if (drill.validation.schemaVersion !== 1) {
    errors.push(`Unsupported validation schema version for drill "${drill.id}".`);
    return { rules, errors };
  }
  const pattern = patternValidators.get(drill.patternId);
  if (!pattern) {
    errors.push(`No validator is registered for pattern "${drill.patternId}".`);
    return { rules, errors };
  }
  const variantRules = pattern.variants[drill.validation.variant];
  if (!variantRules) {
    errors.push(`No "${drill.validation.variant}" validator is registered for pattern "${drill.patternId}".`);
    return { rules, errors };
  }
  for (const rule of drill.rules) {
    const validator = variantRules[rule.id] ?? commonRules[rule.id];
    if (validator) rules.set(rule.id, validator);
    else errors.push(`Rule "${rule.id}" is not implemented by the "${drill.validation.variant}" validator.`);
  }
  return { rules, errors };
}
