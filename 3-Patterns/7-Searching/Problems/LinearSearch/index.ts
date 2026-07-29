/**
 * cd to LinearSearch folder and then run "npx ts-node index.ts"
   LinearSearch is a searching algorithm, which is usually done on an array of sorted elements.
 * Best case - O(1)
   Worst case complexity - O(n)
 */

import { Log } from "../../../../Log";

function search(nums: Array<number>, target: number) {
  for (const num of nums) {
    if (num === target) return true;
  }
  return false;
}

(() => {
  let nums = [3, 2, 5, 8, 1, 9],
    target = 1;
  let result = search(nums, target);
  Log.info(`Does ${target} exists in [${nums}] array? ${result}`);

  (nums = [3, 2, 5, 8, 1, 9]), (target = 10);
  result = search(nums, target);
  Log.info(`Does ${target} exists in [${nums}] array? ${result}`);
})();
