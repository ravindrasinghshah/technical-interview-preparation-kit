export type PatternId =
  | "two-pointers"
  | "sliding-window"
  | "prefix-sum"
  | "string-building"
  | "linked-list"
  | "monotonic-stack"
  | "binary-tree";

export type ValidationRuleId =
  | "two-index-initializers"
  | "loop-with-comparison"
  | "conditional-branch"
  | "two-directional-updates"
  | "same-direction-updates"
  | "window-boundaries"
  | "window-shrink-loop"
  | "joint-traversal"
  | "tail-exhaustion"
  | "prefix-seed"
  | "prefix-accumulation"
  | "frequency-map-seed"
  | "prefix-frequency-count"
  | "accumulator-initializer"
  | "iterates-input"
  | "appends-character"
  | "joins-characters"
  | "concatenates-character"
  | "fast-slow-initializers"
  | "fast-slow-guard"
  | "fast-slow-steps"
  | "reversal-initializers"
  | "saves-next-node"
  | "reverses-link"
  | "advances-reversal"
  | "stack-initializer"
  | "monotonic-shrink-loop"
  | "stack-pop"
  | "stack-push"
  | "null-base-case"
  | "recursive-child-visits"
  | "traversal-stack"
  | "visits-tree-children"
  | "level-queue"
  | "captures-level-size"
  | "level-loop"
  | "replaces-level-queue"
  | "returns-value";

export interface ValidationRule {
  id: ValidationRuleId;
  message: string;
}

export type ValidatorVariant =
  | "opposite-ends"
  | "variable-window"
  | "two-input-exhaustion"
  | "prefix-array"
  | "frequency-map-count"
  | "array-join"
  | "concatenation"
  | "fast-slow"
  | "reverse"
  | "increasing-stack"
  | "dfs-recursive"
  | "dfs-iterative"
  | "bfs-level-order";

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
