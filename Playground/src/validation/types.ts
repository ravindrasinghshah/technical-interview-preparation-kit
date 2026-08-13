import type { PatternId, TemplateDrill, ValidationRuleId, ValidatorVariant } from "../types";
import type { ValidationContext } from "./ast/context";

export type RuleValidator = (context: ValidationContext, drill: TemplateDrill) => boolean;

export interface PatternValidator {
  patternId: PatternId;
  variants: Partial<Record<ValidatorVariant, Partial<Record<ValidationRuleId, RuleValidator>>>>;
}
