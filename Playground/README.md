# Pattern Playground

A local React playground for recalling common coding-interview templates from memory. It validates the structure of TypeScript code in the browser, so alternate variable names and formatting are accepted and submitted code never leaves the device.

## Included drills

- Two Pointers: opposite ends, two-input exhaustion
- Sliding Window: expand and shrink
- Prefix Sum: build a prefix array, count exact subarrays
- String Building: array buffer and join, direct concatenation
- Linked List: fast/slow pointers, in-place reversal
- Monotonic Stack: increasing stack
- Binary Tree: recursive DFS, iterative DFS, level-order BFS

Progress is stored in `localStorage` as completed drill IDs. Revealing an answer does not complete a drill.

## Content configuration

`src/data/code-templates.md` is the source of truth for practice templates. Its current 13 implementations map one-to-one to entries in `codeTemplateRequirementDrillIds`; tests reject both missing and extra catalog drills.

Patterns and drills are defined in `src/config/practiceCatalog.config.ts`. This typed catalog enriches the source templates with stable IDs, prompts, explanations, links, and validation descriptors while keeping content separate from UI behavior. A future database or CMS integration can replace it while preserving the same `PatternInfo` and `TemplateDrill` shapes.

Each drill has a serializable, versioned validation descriptor such as:

```ts
validation: { schemaVersion: 1, variant: "opposite-ends" }
```

This lets future database or CMS records select known validators without storing or executing code from the content source.

## Validation architecture

The submitted template is parsed but never executed. `src/lib/validator.ts` is the stable public facade for the validation system:

```text
src/validation/
  engine.ts                         Parse, evaluate, and combine results
  registry.ts                       Resolve pattern and variant validators
  common.validator.ts               Shared rules such as return behavior
  ast/                              Shared traversal and relationship queries
  patterns/
    twoPointers.validator.ts
    slidingWindow.validator.ts
    prefixSum.validator.ts
    stringBuilding.validator.ts
    linkedList.validator.ts
    monotonicStack.validator.ts
    binaryTree.validator.ts
```

Pattern validators infer meaningful roles and check that the same variables participate throughout the template. For example, linked-list reversal must save the next node before rewiring the current link, then advance the inferred pointers in the correct order. Nested helper functions cannot contribute unrelated syntax to make a submission pass.

To add a pattern, define its serializable variant and rule IDs, implement a `PatternValidator`, register it in `validation/registry.ts`, and add canonical plus adversarial fixtures.

## Run locally

```bash
cd Playground
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

The MVP intentionally does not execute submitted code or use an AI service. Validation is deterministic and powered by the TypeScript parser.
