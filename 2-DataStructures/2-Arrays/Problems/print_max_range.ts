/**
 * run "npx ts-node 2-DataStructures\Arrays\Problems\print_max_range.ts"
 * Swap item in array
 * Worst case complexity - O(n)
 */

import { Log } from "../../../Log";

function print_max_range(nums: Array<number>, start: number, end: number) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = start; i <= end; i++) {
    max = Math.max(max, nums[i]);
  }
  Log.info(
    `Max number in [${nums}] within range of ${start}-${end} is ${max}.`
  );
}

(() => {
  let nums = [1, 2, 3, 4, 5];
  print_max_range(nums, 0, 2);
  Log.info("-----------------------------------");
  nums = [6, 7, 8, 9];
  print_max_range(nums, 1, 3);

  Log.info("-----------------------------------");
  nums = [-6, -7, -8, -9];
  print_max_range(nums, 2, 3);
})();
