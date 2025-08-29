/**
 * cd to Recursion and run node findFibonacci.ts
 * fib: 0, 1, 1, 2, 3, 5, 8, 13....
 */

import { Log } from "../../../Log";

function find_fibonacci(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return find_fibonacci(n - 2) + find_fibonacci(n - 1);
}

(() => {
  let num = 4;
  let result = find_fibonacci(num);
  Log.info(`fibonacci of ${num} is ${result}`);

  num = 6;
  result = find_fibonacci(num);
  Log.info(`fibonacci of ${num} is ${result}`);
})();
