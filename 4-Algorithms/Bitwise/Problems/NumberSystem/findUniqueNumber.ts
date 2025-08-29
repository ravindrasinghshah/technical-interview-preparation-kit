/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\findUniqueNumber.ts"
 */

import { Log } from "../../../../Log";

function findUniqueNumber(nums: Array<number>) {
  let unique = 0;
  for (const num of nums) {
    unique ^= num;
    Log.info(num, unique);
  }
  return unique;
}
(() => {
  let nums = [1, 2, 3, 4, 3, 2, 5, 1, 4];
  let result = findUniqueNumber(nums);
  Log.info(`Unique number in [${nums}] is ${result}`);
})();
