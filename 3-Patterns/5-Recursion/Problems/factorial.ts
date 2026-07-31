/**
 * run npx ts-node 3-Patterns\5-Recursion\Problems\factorial.ts
 */

export function factorial(n: number): number {
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

