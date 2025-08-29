/**
 * run "npx ts-node 2-DataStructures\Arrays\Problems\swap.ts"
 * Swap item in array
 * Worst case complexity - O(1)
 */

import { Log } from "../../../Log";

function swap(nums: Array<number>, index1: number, index2: number) {
  const temp = nums[index1];
  nums[index1] = nums[index2];
  nums[index2] = temp;
  Log.info(nums);
}
(() => {
  let nums = [1, 2, 3, 4, 5];
  swap(nums, 0, 4);
  Log.info("-----------------------------------");
  nums = [6, 7, 8, 9];
  swap(nums, 3, 2);
})();
