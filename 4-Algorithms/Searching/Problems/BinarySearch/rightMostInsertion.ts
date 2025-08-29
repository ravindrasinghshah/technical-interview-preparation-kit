/**
 * cd to algos folder and then run "npx ts-node rightMostInsertion.ts"
   Find the right most insertion index.
 * Worst case complexity - O(log n)
 */

import { Log } from "../../../../Log";

function bs_right_most_insertion(nums: Array<number>, target: number) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > target) right = mid;
    else left = mid + 1;
  }
  return left;
}

(() => {
  const nums = [1, 2, 3, 5, 7, 10];
  Log.info(`Array provided: ${nums}`);
  let result = bs_right_most_insertion(nums, 4);
  Log.info(
    `# When target is within sorted array, right most insertion index: ${result}`
  );
  result = bs_right_most_insertion(nums, 14);
  Log.info(
    `# When target is not within sorted array, right most insertion index: ${result}`
  );

  /**
   * [1, 2, 3, 5, 7, 10]
   * left = 0; right = 6; mid = 3
   * 5 <= 7 -> right = 3 ; mid = 1
   */
})();
