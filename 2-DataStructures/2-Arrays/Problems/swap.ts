/**
 * run "npx ts-node 2-DataStructures\2-Arrays\Problems\swap.ts"
 * Swap item in array
 * Worst case complexity - O(1)
 */

import { Log } from "../../../Log";

export function swap(nums: Array<number>, index1: number, index2: number) {
  const temp = nums[index1];
  nums[index1] = nums[index2];
  nums[index2] = temp;
  Log.info(nums);
}
