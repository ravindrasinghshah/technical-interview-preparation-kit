/**
 * cd to algos folder and then run "npx ts-node findTargetInfiniteArray.ts"
   Find target in sorted infinite array. (https://www.geeksforgeeks.org/dsa/find-position-element-sorted-array-infinite-numbers/)
 * Complexity - O(log n)
  formula to find size of sub-array by indices
  size of sub-array: (end - start + 1)
 */

function findTargetInfiniteArray(nums: Array<number>, target: number) {
  function bs(left: number, right: number) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let num = nums[mid];
      if (isNaN(num)) num = Number.MAX_SAFE_INTEGER; //== edge case: if mid is out of bound and number is last index in array
      if (num === target) return mid;
      else if (num > target) right = mid - 1;
      else left = mid + 1;
    }
    return -1;
  }

  let left = 0,
    right = 1;
  while (nums[right] < target) {
    let leftTemp = right + 1;
    right = right + (right - left + 1) * 2;
    left = leftTemp;
  }

  const ans = bs(left, right);
  return ans;
}

(() => {
  let nums = [1, 2, 3, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  let target = 19;
  let result = findTargetInfiniteArray(nums, target);
  console.log(`${target} index position in [${nums}] is ${result}`);
  nums = [3, 5, 7, 9, 10, 90, 100, 130, 140, 160, 170];
  target = 10;
  result = findTargetInfiniteArray(nums, target);
  console.log(`${target} index position in [${nums}] is [${result}]`);

  nums = [2, 5, 7, 9];
  target = 3;
  result = findTargetInfiniteArray(nums, target);
  console.log(`${target} index position in [${nums}] is [${result}]`);
})();
