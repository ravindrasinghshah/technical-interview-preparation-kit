/**
 * cd to algos folder and then run "npx ts-node findPivot.ts"
   Find the index position of pivot in rotated array.
 * Worst case complexity - O(log n)
 */

function findPivot(nums: Array<number>) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid < right && nums[mid] > nums[mid + 1]) return mid;
    if (mid > left && nums[mid] < nums[mid - 1]) return mid - 1;
    if (nums[mid] <= nums[left])
      left = mid + 1; //== it means number after mid is smaller than left
    else right = mid - 1;
  }
  return -1;
}
(() => {
  let nums = [1, 2, 3, 5, 7, 10];
  let result = findPivot(nums); //== -1
  console.log(`# Pivot in array [${nums}] is ${result}`);

  nums = [4, 5, 6, 7, 0, 1, 2];
  result = findPivot(nums); //== 3
  console.log(`# Pivot in array [${nums}] is ${result}`);
})();
