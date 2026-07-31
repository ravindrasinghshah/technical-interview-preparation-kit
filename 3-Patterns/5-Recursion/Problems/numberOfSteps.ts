/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\numberOfSteps.ts
 */

export function numberOfSteps_s(n: number, steps: number = 0) {
  if (n === 0) {
    return steps;
  }
  if (n % 2 === 0) return numberOfSteps_s(n / 2, ++steps);
  else return numberOfSteps_s(n - 1, ++steps);
}

export function numberOfSteps(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n % 2 === 0) return 1 + numberOfSteps(n / 2);
  else return 1 + numberOfSteps(n - 1);
}

