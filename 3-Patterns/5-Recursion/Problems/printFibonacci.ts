/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\printFibonacci.ts
 * fib: 0, 1, 1, 2, 3, 5, 8, 13....
 * Generator functions concept used to print the fib series
 */

export function* print_fibonacci(n: number): Generator<number> {
  let [a, b] = [0, 1];
  while (n > 0) {
    n--;
    yield a;
    [a, b] = [b, a + b];
  }
}

