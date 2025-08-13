/**
 * cd to algos folder and then run "npx ts-node findMin.ts"
 */

function findMin(nums: Array<number>) {
  let min = nums[0];
  for (const num of nums) {
    min = Math.min(min, num);
  }
  return min;
}

(() => {
  let nums = [3, 2, 5, 8, 1, 9];
  let result = findMin(nums);
  console.log(`Min number in [${nums}] array is: ${result}`);

  nums = [3, 2, 5, 8, -1, -9];
  result = findMin(nums);
  console.log(`Min number in [${nums}] array is: ${result}`);
})();
