export type PatternId = "two-pointers" | "sliding-window" | "binary-search";

export type ValidationRuleId =
  | "two-index-initializers"
  | "loop-with-comparison"
  | "conditional-branch"
  | "two-directional-updates"
  | "same-direction-updates"
  | "window-boundaries"
  | "window-shrink-loop"
  | "frequency-collection"
  | "binary-midpoint"
  | "binary-boundary-updates"
  | "tracks-candidate"
  | "predicate-call"
  | "returns-value";

export interface ValidationRule {
  id: ValidationRuleId;
  message: string;
}

export type ValidatorVariant =
  | "opposite-ends"
  | "same-direction"
  | "sorted-pair"
  | "fixed-window"
  | "variable-window"
  | "frequency-window"
  | "exact-match"
  | "boundary-search"
  | "answer-space";

export interface ValidationDescriptorV1 {
  schemaVersion: 1;
  variant: ValidatorVariant;
}

export interface TemplateDrill {
  id: string;
  patternId: PatternId;
  title: string;
  eyebrow: string;
  prompt: string;
  starterCode: string;
  canonicalCode: string;
  explanation: string;
  referenceUrl: string;
  validation: ValidationDescriptorV1;
  rules: ValidationRule[];
}

export interface SourceDiagnostic {
  message: string;
  line: number;
  column: number;
}

export interface ValidationResult {
  valid: boolean;
  syntaxErrors: SourceDiagnostic[];
  configurationErrors: string[];
  checks: Array<{ ruleId: string; passed: boolean; message: string }>;
}

export interface SavedProgressV1 {
  version: 1;
  completedDrillIds: string[];
}
