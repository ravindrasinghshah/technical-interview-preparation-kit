/**
 * cd to algos folder and then run "node findPeakElement.js"
   A peak element is an element that is strictly greater than its neighbors.
   https://leetcode.com/problems/find-peak-element/description/
 * Worst case complexity - O(log n)
 */

function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}

let nums = [1, 2, 1, 3, 5, 6, 4];
let result = findPeakElement(nums); //== -1
console.log(`# Peak in an array [${nums}] is ${result}`);


nums = [1, 2, 3, 1];
result = findPeakElement(nums); //== 3
console.log(`# Peak in an array [${nums}] is ${result}`);