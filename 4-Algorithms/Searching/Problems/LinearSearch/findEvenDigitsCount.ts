/**
 * cd to algos folder and then run "npx ts-node findEvenDigitsCount.ts"
 */

import { Log } from "../../../../Log";

function findEvenDigitsCount(nums: Array<number>) {
  let count = 0;
  for (const num of nums) {
    if (num % 2 === 0) count++;
  }
  return count;
}

(() => {
  let nums = [3, 2, 5, 8, 1, 9];
  let result = findEvenDigitsCount(nums);
  Log.info(`In [${nums}] array count of even digits is: ${result}`);

  nums = [3, 2, 5, 8, -12, -90];
  result = findEvenDigitsCount(nums);
  Log.info(`In [${nums}] array count of even digits is: ${result}`);
})();
