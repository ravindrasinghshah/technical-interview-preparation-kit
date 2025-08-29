/**
 * cd to Recursion and run node sumOfDigits.ts
 */

import { Log } from "../../../Log";

function sumOfDigits(n: number): number {
  if (n === 0) return 0;

  let remainder = n % 10;
  let reducedN = Math.floor(n / 10);
  return sumOfDigits(reducedN) + remainder;
}

(() => {
  let num = 12345;
  let result = sumOfDigits(num);
  Log.info(`sum of digits ${num} is ${result}`);

  num = 111;
  result = sumOfDigits(num);
  Log.info(`sum of digits ${num} is ${result}`);
})();
