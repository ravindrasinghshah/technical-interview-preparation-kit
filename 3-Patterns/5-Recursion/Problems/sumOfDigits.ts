/**
 * cd to Recursion and run node 3-Patterns\5-Recursion\Problems\sumOfDigits.ts
 */

export function sumOfDigits(n: number): number {
  if (n === 0) return 0;

  let remainder = n % 10;
  let reducedN = Math.floor(n / 10);
  return sumOfDigits(reducedN) + remainder;
}

