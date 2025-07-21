/**
 * cd to algos folder and then run "node findFirstAndLastPosition.js"
   Find first and last index of target.
 * Complexity - O(log n)
 */

function findFirstAndLastPosition(nums, target) {
  let ans = [];
  function findIndexPos(findFirst = false) {
    let left = 0, right = nums.length, pos = -1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        pos = mid;
        if (findFirst) {
          right = mid - 1;
        }
        else {
          left = mid + 1;
        }
      }
      else if (nums[mid] > target) right = mid - 1;
      else left = mid + 1;
    }
    return pos;
  }
  ans[0] = findIndexPos(true);
  ans[1] = findIndexPos();
  return ans;
}

let nums = [1, 2, 3, 5, 7, 10, 10]; let target = 10
let result = findFirstAndLastPosition(nums, target);
console.log(`First and Last index of ${target} in [${nums}] is [${result}]`);
nums = [5, 7, 7, 8, 8, 10]; target = 6
result = findFirstAndLastPosition(nums, target);
console.log(`First and Last index of ${target} in [${nums}] is [${result}]`);

