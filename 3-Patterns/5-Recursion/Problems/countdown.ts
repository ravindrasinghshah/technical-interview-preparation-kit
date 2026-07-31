/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\countdown.ts
 */

export function countdown(n: number): number[] {
  if (n <= 0) return [0];
  return [n, ...countdown(n - 1)];
}
