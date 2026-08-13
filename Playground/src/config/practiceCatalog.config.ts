import type { PatternId, TemplateDrill, ValidationRule, ValidationRuleId } from "../types";

/**
 * Static content source for the MVP.
 *
 * Components should consume this catalog rather than define practice content.
 * It can later be replaced by a database or CMS adapter that returns the same
 * PatternInfo and TemplateDrill shapes.
 */

const rule = (id: ValidationRuleId, message: string): ValidationRule => ({ id, message });
const common = [
  rule("loop-with-comparison", "Use a loop controlled by a comparison."),
  rule("returns-value", "Return the result from the template."),
] satisfies ValidationRule[];

export interface PatternInfo {
  title: string;
  description: string;
  accent: string;
}

export const patternInfo: Record<PatternId, PatternInfo> = {
  "two-pointers": {
    title: "Two Pointers",
    description: "Coordinate two indices to reduce repeated work.",
    accent: "coral",
  },
  "sliding-window": {
    title: "Sliding Window",
    description: "Maintain a useful contiguous range as it moves.",
    accent: "violet",
  },
  "binary-search": {
    title: "Binary Search",
    description: "Discard half of an ordered search space each step.",
    accent: "cyan",
  },
};

export const drills: TemplateDrill[] = [
  {
    id: "two-pointers-opposite-ends", patternId: "two-pointers", eyebrow: "FOUNDATION 01", title: "Opposite ends",
    validation: { schemaVersion: 1, variant: "opposite-ends" },
    prompt: "Write a reusable template that starts at both ends of an array, processes a pair, and moves one pointer inward until they meet.",
    starterCode: `function solve(values: number[]) {\n  // Start at both ends\n\n  // Process pairs until the pointers meet\n\n  return 0;\n}`,
    canonicalCode: `function solve(values: number[]) {\n  let left = 0;\n  let right = values.length - 1;\n  let answer = 0;\n\n  while (left < right) {\n    if (values[left] + values[right] > 0) {\n      right--;\n    } else {\n      left++;\n    }\n  }\n\n  return answer;\n}`,
    explanation: "Opposite-end pointers are useful when ordering lets either boundary be discarded after every comparison.",
    referenceUrl: "https://leetcode.com/articles/two-pointer-technique/",
    rules: [rule("two-index-initializers", "Initialize one index at 0 and another from the input length."), rule("conditional-branch", "Choose which pointer to move with a condition."), rule("two-directional-updates", "Move one pointer forward and the other backward."), ...common],
  },
  {
    id: "two-pointers-same-direction", patternId: "two-pointers", eyebrow: "FOUNDATION 02", title: "Same direction",
    validation: { schemaVersion: 1, variant: "same-direction" },
    prompt: "Write the slow/fast pointer skeleton used to scan an array while compacting or filtering values in place.",
    starterCode: `function compact(values: number[]) {\n  // Add slow and fast pointers\n\n  return 0;\n}`,
    canonicalCode: `function compact(values: number[]) {\n  let slow = 0;\n  for (let fast = 0; fast < values.length; fast++) {\n    if (values[fast] !== 0) {\n      values[slow] = values[fast];\n      slow++;\n    }\n  }\n  return slow;\n}`,
    explanation: "The fast pointer explores every value while the slow pointer marks the next output position.",
    referenceUrl: "https://leetcode.com/tag/two-pointers/",
    rules: [rule("two-index-initializers", "Initialize two index variables."), rule("conditional-branch", "Conditionally accept or process the fast pointer value."), rule("same-direction-updates", "Advance both indices in the forward direction."), ...common],
  },
  {
    id: "two-pointers-sorted-pair", patternId: "two-pointers", eyebrow: "FOUNDATION 03", title: "Sorted pair search",
    validation: { schemaVersion: 1, variant: "sorted-pair" },
    prompt: "Create the template for finding a target pair in sorted input by comparing a sum and narrowing from either side.",
    starterCode: `function findPair(values: number[], target: number) {\n  // Search inward from both sides\n\n  return false;\n}`,
    canonicalCode: `function findPair(values: number[], target: number) {\n  let low = 0;\n  let high = values.length - 1;\n  while (low < high) {\n    const sum = values[low] + values[high];\n    if (sum === target) return true;\n    if (sum < target) low++;\n    else high--;\n  }\n  return false;\n}`,
    explanation: "Sorted order tells you whether a sum can only improve by raising the low value or lowering the high value.",
    referenceUrl: "https://leetcode.com/tag/two-pointers/",
    rules: [rule("two-index-initializers", "Initialize the low and high boundaries."), rule("conditional-branch", "Compare the current pair against the target."), rule("two-directional-updates", "Narrow the pair from both possible directions."), ...common],
  },
  {
    id: "sliding-window-fixed", patternId: "sliding-window", eyebrow: "WINDOW 01", title: "Fixed-size window",
    validation: { schemaVersion: 1, variant: "fixed-window" },
    prompt: "Write a template that expands one item at a time and removes the item leaving a window of size k.",
    starterCode: `function maxWindow(values: number[], k: number) {\n  // Track a fixed-size window\n\n  return 0;\n}`,
    canonicalCode: `function maxWindow(values: number[], k: number) {\n  let left = 0;\n  let sum = 0;\n  let best = 0;\n  for (let right = 0; right < values.length; right++) {\n    sum += values[right];\n    if (right - left + 1 === k) {\n      best = Math.max(best, sum);\n      sum -= values[left];\n      left++;\n    }\n  }\n  return best;\n}`,
    explanation: "A fixed window adds the entering element and removes the departing element instead of recalculating the range.",
    referenceUrl: "https://leetcode.com/tag/sliding-window/",
    rules: [rule("window-boundaries", "Track left and right window boundaries."), rule("conditional-branch", "React when the desired window size is reached."), rule("same-direction-updates", "Move both boundaries forward over time."), ...common],
  },
  {
    id: "sliding-window-variable", patternId: "sliding-window", eyebrow: "WINDOW 02", title: "Variable-size window",
    validation: { schemaVersion: 1, variant: "variable-window" },
    prompt: "Write the expand-and-shrink template: expand right, then repeatedly move left while the window violates a condition.",
    starterCode: `function shortestWindow(values: number[], target: number) {\n  // Expand right and shrink left\n\n  return 0;\n}`,
    canonicalCode: `function shortestWindow(values: number[], target: number) {\n  let left = 0;\n  let sum = 0;\n  let best = Infinity;\n  for (let right = 0; right < values.length; right++) {\n    sum += values[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= values[left];\n      left++;\n    }\n  }\n  return best === Infinity ? 0 : best;\n}`,
    explanation: "The outer traversal expands the window; an inner loop restores the invariant by shrinking it as far as possible.",
    referenceUrl: "https://leetcode.com/tag/sliding-window/",
    rules: [rule("window-boundaries", "Track the left and right edges of the window."), rule("window-shrink-loop", "Use a nested loop to shrink the window while its invariant is broken."), rule("same-direction-updates", "Advance both window boundaries."), ...common],
  },
  {
    id: "sliding-window-frequency", patternId: "sliding-window", eyebrow: "WINDOW 03", title: "Frequency-map window",
    validation: { schemaVersion: 1, variant: "frequency-window" },
    prompt: "Write a variable-window template that records element frequencies as the window expands and shrinks.",
    starterCode: `function longestUnique(values: string) {\n  // Track window frequencies\n\n  return 0;\n}`,
    canonicalCode: `function longestUnique(values: string) {\n  let left = 0;\n  let best = 0;\n  const counts = new Map<string, number>();\n  for (let right = 0; right < values.length; right++) {\n    counts.set(values[right], (counts.get(values[right]) ?? 0) + 1);\n    while ((counts.get(values[right]) ?? 0) > 1) {\n      counts.set(values[left], (counts.get(values[left]) ?? 0) - 1);\n      left++;\n    }\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}`,
    explanation: "A Map or Set gives the window memory: update it for both the entering and departing elements.",
    referenceUrl: "https://leetcode.com/tag/sliding-window/",
    rules: [rule("window-boundaries", "Track both window boundaries."), rule("frequency-collection", "Create and update a Map or Set for window membership."), rule("window-shrink-loop", "Shrink repeatedly when the frequency constraint is broken."), ...common],
  },
  {
    id: "binary-search-exact", patternId: "binary-search", eyebrow: "SEARCH 01", title: "Exact match",
    validation: { schemaVersion: 1, variant: "exact-match" },
    prompt: "Write classic binary search over a sorted array, returning the target index or -1.",
    starterCode: `function search(values: number[], target: number) {\n  // Search the ordered range\n\n  return -1;\n}`,
    canonicalCode: `function search(values: number[], target: number) {\n  let low = 0;\n  let high = values.length - 1;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (values[mid] === target) return mid;\n    if (values[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
    explanation: "Midpoint comparison removes one ordered half on every iteration.",
    referenceUrl: "https://leetcode.com/tag/binary-search/",
    rules: [rule("two-index-initializers", "Initialize lower and upper search boundaries."), rule("binary-midpoint", "Compute a midpoint from both boundaries."), rule("conditional-branch", "Compare the midpoint value with the target."), rule("binary-boundary-updates", "Move a boundary relative to the midpoint."), ...common],
  },
  {
    id: "binary-search-boundary", patternId: "binary-search", eyebrow: "SEARCH 02", title: "Boundary search",
    validation: { schemaVersion: 1, variant: "boundary-search" },
    prompt: "Write a binary-search template that remembers a valid candidate and continues left to find the first occurrence.",
    starterCode: `function firstIndex(values: number[], target: number) {\n  // Find the leftmost valid index\n\n  return -1;\n}`,
    canonicalCode: `function firstIndex(values: number[], target: number) {\n  let low = 0;\n  let high = values.length - 1;\n  let answer = -1;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (values[mid] >= target) {\n      if (values[mid] === target) answer = mid;\n      high = mid - 1;\n    } else {\n      low = mid + 1;\n    }\n  }\n  return answer;\n}`,
    explanation: "Boundary search saves a candidate, then keeps searching the side where an earlier valid answer may exist.",
    referenceUrl: "https://leetcode.com/tag/binary-search/",
    rules: [rule("two-index-initializers", "Initialize lower and upper boundaries."), rule("binary-midpoint", "Compute a midpoint."), rule("tracks-candidate", "Keep a separate candidate answer while searching."), rule("binary-boundary-updates", "Continue narrowing relative to the midpoint."), ...common],
  },
  {
    id: "binary-search-answer-space", patternId: "binary-search", eyebrow: "SEARCH 03", title: "Answer-space search",
    validation: { schemaVersion: 1, variant: "answer-space" },
    prompt: "Write a template that binary-searches a numeric answer range using an isFeasible predicate.",
    starterCode: `function minimize(low: number, high: number) {\n  const isFeasible = (candidate: number) => true;\n  // Search for the smallest feasible answer\n\n  return low;\n}`,
    canonicalCode: `function minimize(low: number, high: number) {\n  const isFeasible = (candidate: number) => candidate >= 0;\n  let answer = high;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (isFeasible(mid)) {\n      answer = mid;\n      high = mid - 1;\n    } else {\n      low = mid + 1;\n    }\n  }\n  return answer;\n}`,
    explanation: "When feasibility is monotonic, search candidate answers just as you would search sorted values.",
    referenceUrl: "https://leetcode.com/tag/binary-search/",
    rules: [rule("binary-midpoint", "Compute the midpoint of the answer range."), rule("predicate-call", "Test the midpoint with a feasibility predicate."), rule("tracks-candidate", "Remember the best feasible candidate."), rule("binary-boundary-updates", "Narrow the answer range around the midpoint."), ...common],
  },
];
