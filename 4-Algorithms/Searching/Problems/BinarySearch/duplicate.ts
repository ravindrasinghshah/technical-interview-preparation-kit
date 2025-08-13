/**
 * cd to algos folder and then run "npx ts-node duplicate.ts"
   Find the left-most index of duplicate item.
 * Worst case complexity - O(log n)
 */

function bs_duplicate(nums: Array<number>, target: number) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] >= target) right = mid;
    // left most position of target; for right most remove equal to sign
    else left = mid + 1;
  }
  return left;
}

(() => {
  const nums = [1, 2, 3, 5, 7, 10, 10];
  console.log(`Array provided: ${nums}`);
  let result = bs_duplicate(nums, 5);
  console.log(`Left most index of duplicate: ${result}`);
  result = bs_duplicate(nums, 10);
  console.log(`# Left most index of duplicate: ${result}`);

  /**
   * [1, 2, 3, 5, 7, 10]
   * left = 0; right = 6; mid = 3
   * 5 <= 7 -> right = 3 ; mid = 1
   *
   */
})();
