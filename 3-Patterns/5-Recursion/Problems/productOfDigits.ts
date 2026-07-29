/**
 * cd to Recursion and run npx ts-node productOfDigits.ts
 */

import { Log } from "../../../Log";

function productOfDigits(n: number): number {
  if (n === 0) return 1;
  let remainder = n % 10;
  let reducedN = Math.floor(n / 10);
  return productOfDigits(reducedN) * remainder;
}

(() => {
  let num = 12345;
  let result = productOfDigits(num);
  Log.info(`Product of digits ${num} is ${result}`);

  num = 123;
  result = productOfDigits(num);
  Log.info(`Product of digits ${num} is ${result}`);

  num = 10;
  result = productOfDigits(num);
  Log.info(`Product of digits ${num} is ${result}`);
})();
