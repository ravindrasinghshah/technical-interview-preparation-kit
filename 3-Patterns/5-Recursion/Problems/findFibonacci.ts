/**
 * cd to Recursion and run node 3-Patterns\5-Recursion\Problems\findFibonacci.ts
 * fib: 0, 1, 1, 2, 3, 5, 8, 13....
 */

export function find_fibonacci(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return find_fibonacci(n - 2) + find_fibonacci(n - 1);
}

