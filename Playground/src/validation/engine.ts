import type { TemplateDrill, ValidationResult } from "../types";
import { createValidationContexts, type ValidationContext } from "./ast/context";
import { parseSubmission } from "./ast/parse";
import { resolveValidators } from "./registry";

export function validateDrill(code: string, drill: TemplateDrill): ValidationResult {
  const { source, syntaxErrors } = parseSubmission(code);
  const contexts = createValidationContexts(source);
  const resolution = resolveValidators(drill);
  const evaluate = (context: ValidationContext) => {
    const evaluationErrors = [...resolution.errors];
    const checks = drill.rules.map((rule) => {
      const validator = resolution.rules.get(rule.id);
      let passed = false;
      if (validator && syntaxErrors.length === 0 && evaluationErrors.length === 0) {
        try {
          passed = validator(context, drill);
        } catch {
          evaluationErrors.push(`Validator rule "${rule.id}" could not evaluate this submission.`);
        }
      }
      return { ruleId: rule.id, passed, message: rule.message };
    });
    return { checks, configurationErrors: [...new Set(evaluationErrors)] };
  };

  const evaluations = contexts.map(evaluate);
  const selected = evaluations.reduce((best, candidate) => {
    const bestScore = best.checks.filter((check) => check.passed).length;
    const candidateScore = candidate.checks.filter((check) => check.passed).length;
    return candidateScore > bestScore ? candidate : best;
  });
  const { checks, configurationErrors } = selected;

  return {
    valid: syntaxErrors.length === 0 && configurationErrors.length === 0 && checks.every((check) => check.passed),
    syntaxErrors,
    configurationErrors,
    checks,
  };
}
