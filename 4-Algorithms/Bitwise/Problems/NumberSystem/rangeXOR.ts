/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\rangeXOR.ts"
 * Find the xor of range
 * Complexity O(1)
 */

import { Log } from "../../../../Log";

//== this is a formula based on xor patter
function xor(a: number) {
  if (a % 4 === 0) return a;
  if (a % 4 === 1) return 1;
  if (a % 4 === 2) return a + 1;
  return 0;
}
function rangeXOR(a: number, b: number) {
  let ans = 1;
  ans = xor(b) ^ xor(a - 1); //== formula to calculate xor in range
  return ans;
}

(() => {
  let a = 3,
    b = 9;
  let result = rangeXOR(a, b);
  Log.info(`XOR of range ${a}-${b} is ${result}`);
})();
