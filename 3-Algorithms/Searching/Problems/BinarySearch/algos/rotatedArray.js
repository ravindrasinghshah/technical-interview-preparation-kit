/**
 * cd to algos folder and then run "node rotatedArray.js"
   Search num in rotated sorted array.
   https://leetcode.com/problems/search-in-rotated-sorted-array/description/
 * Complexity - O(log n)
 */

function rotatedArrayWithPivot(nums, target) {
  //== find pivot to know the start and end of rotated array, then search index of target/
  function findPivotIndex() {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (nums[m] > nums[m + 1]) return m; //== if next element is small then this is pivot;
      if (nums[m - 1] > nums[m]) return m - 1; //== if prev element is bigger then that is pivot;
      if (nums[m] <= nums[l]) l = m + 1;
      else r = m - 1;
    }
    return -1; // if not rotated
  }

  function bs(s, e) {
    while (s <= e) {
      const m = Math.floor((s + e) / 2);
      if (nums[m] === target) return m;
      if (nums[m] > target) e = m - 1;
      else s = m + 1;
    }
    return -1;
  }


  const pivotIndex = findPivotIndex();
  if (nums[pivotIndex] === target) return pivotIndex;
  const beforePivot = bs(0, pivotIndex - 1);
  if (beforePivot != -1) return beforePivot;
  return bs(pivotIndex + 1, nums.length - 1);
}

function rotatedArray(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] > nums[l]) { //=== left sorted
      if (target >= nums[l] && target < nums[m]) r = m - 1;
      else l = m + 1;
    }
    else {
      if (target > nums[m] && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}

let nums = [4, 5, 6, 7, 0, 1, 2], target = 7; //== 3
let result = rotatedArray(nums, target);
console.log(`# Index position of ${target} in [${nums}] is : ${result}`);

nums = [4, 5, 6, 7, 0, 1, 2], target = 4; //== 0
result = rotatedArray(nums, target);
console.log(`# Index position of ${target} in [${nums}] is : ${result}`);

nums = [4, 5, 6, 7, 0, 1, 2], target = 2; //== 6
result = rotatedArray(nums, target);
console.log(`# Index position of ${target} in [${nums}] is : ${result}`);

nums = [4, 5, 6, 7, 0, 1, 2], target = 3; //== -1
result = rotatedArray(nums, target);
console.log(`# Index position of ${target} in [${nums}] is : ${result}`);