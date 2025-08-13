/**
 * cd to algos folder and then run "npx ts-node rotationCount.ts"
   Rotation Count in a Rotated Sorted array
https://www.geeksforgeeks.org/dsa/find-rotation-count-rotated-sorted-array/
 * Complexity - O(log n)
 */

function rotationCount(nums: Array<number>) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (m < r && nums[m] > nums[m + 1]) return m + 1;
    if (m > l && nums[m - 1] > nums[m]) return m;
    if (nums[m] >= nums[l]) l = m + 1;
    else r = m - 1;
  }
  return nums.length;
}

(() => {
  let nums = [15, 18, 2, 3, 6, 12];
  let result = rotationCount(nums); //= 2
  console.log(`# Array [${nums}] is rotated: ${result} times`);

  nums = [7, 9, 11, 12, 5];
  result = rotationCount(nums); //= 4
  console.log(`# Array [${nums}] is rotated: ${result} times`);

  nums = [7, 9, 11, 12, 15];
  result = rotationCount(nums); //= 5
  console.log(`# Array [${nums}] is rotated: ${result} times`);

  nums = [5, 6, 7, 0, 1, 2, 3];
  result = rotationCount(nums); //= 3
  console.log(`# Array [${nums}] is rotated: ${result} times`);
})();
