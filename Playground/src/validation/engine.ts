import type { TemplateDrill, ValidationResult } from "../types";
import { createValidationContext } from "./ast/context";
import { parseSubmission } from "./ast/parse";
import { resolveValidators } from "./registry";

export function validateDrill(code: string, drill: TemplateDrill): ValidationResult {
  const { source, syntaxErrors } = parseSubmission(code);
  const context = createValidationContext(source);
  const resolution = resolveValidators(drill);
  const configurationErrors = [...resolution.errors];

  const checks = drill.rules.map((rule) => {
    const validator = resolution.rules.get(rule.id);
    let passed = false;
    if (validator && syntaxErrors.length === 0 && configurationErrors.length === 0) {
      try {
        passed = validator(context, drill);
      } catch {
        configurationErrors.push(`Validator rule "${rule.id}" could not evaluate this submission.`);
      }
    }
    return { ruleId: rule.id, passed, message: rule.message };
  });

  return {
    valid: syntaxErrors.length === 0 && configurationErrors.length === 0 && checks.every((check) => check.passed),
    syntaxErrors,
    configurationErrors: [...new Set(configurationErrors)],
    checks,
  };
}
