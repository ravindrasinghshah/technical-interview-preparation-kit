/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\countdownReverse.ts
 */

export function countdownReverse(n: number): number[] {
  if (n <= 0) return [];
  return [...countdownReverse(n - 1), n];
}
