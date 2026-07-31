/**
 * run "npx ts-node 2-DataStructures\2-Arrays\Problems\reverse.ts"
 * Swap item in array
 * Worst case complexity - O(1)
 */

import { Log } from "../../../Log";

export function reverse(nums: Array<number>) {
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

