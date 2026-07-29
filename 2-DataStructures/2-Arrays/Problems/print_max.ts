/**
 * run "npx ts-node 2-DataStructures\Arrays\Problems\print_max.ts"
 * Swap item in array
 * Worst case complexity - O(n)
 */

import { Log } from "../../../Log";

function print_max(nums: Array<number>) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
  }
  Log.info(`Max number in [${nums}] is ${max}.`);
}

(() => {
  let nums = [1, 2, 3, 4, 5]; // 5
  print_max(nums);
  Log.info("-----------------------------------");
  nums = [6, 7, 8, 9]; // 9
  print_max(nums);

  Log.info("-----------------------------------");
  nums = [-6, -7, -8, -9]; // -6
  print_max(nums);
})();
