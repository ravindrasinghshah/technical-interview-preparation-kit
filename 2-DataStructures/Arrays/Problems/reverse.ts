/**
 * run "npx ts-node 2-DataStructures\Arrays\Problems\reverse.ts"
 * Swap item in array
 * Worst case complexity - O(1)
 */

import { Log } from "../../../Log";

function reverse(nums: Array<number>) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
    left++;
    right--;
  }
  Log.info(`Reverse is [${nums}]`);
}

(() => {
  let nums = [1, 2, 3, 4, 5]; // [5,4,3,2,1]
  reverse(nums);
  Log.info("-----------------------------------");
  nums = [6, 7, 8, 9]; // [9,8,7,6]
  reverse(nums);
})();
