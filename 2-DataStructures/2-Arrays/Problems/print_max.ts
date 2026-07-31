/**
 * run "npx ts-node 2-DataStructures\2-Arrays\Problems\print_max.ts"
 * Swap item in array
 * Worst case complexity - O(n)
 */

import { Log } from "../../../Log";

export function print_max(nums: Array<number>) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
  }
  Log.info(`Max number in [${nums}] is ${max}.`);
}

