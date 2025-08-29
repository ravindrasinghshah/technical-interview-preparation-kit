/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\power.ts"
 * Find the power of number
 * Complexity log n
 */

import { Log } from "../../../../Log";

function power(pow: number, base: number) {
  let ans = 1;
  while (pow > 0) {
    if ((pow & 1) === 1) {
      ans *= base;
    }
    base *= base;
    pow = pow >> 1;
  }
  return ans;
}

(() => {
  let pow = 4,
    base = 2;
  let result = power(pow, base);
  Log.info(`${base} to the power of ${pow} is ${result}`);

  (pow = 3), (base = 5);
  result = power(pow, base);
  Log.info(`${base} to the power of ${pow} is ${result}`);

  (pow = 2), (base = 10);
  result = power(pow, base);
  Log.info(`${base} to the power of ${pow} is ${result}`);
})();
