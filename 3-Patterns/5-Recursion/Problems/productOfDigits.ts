/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\productOfDigits.ts
 */

export function productOfDigits(n: number): number {
  if (n === 0) return 1;
  let remainder = n % 10;
  let reducedN = Math.floor(n / 10);
  return productOfDigits(reducedN) * remainder;
}

