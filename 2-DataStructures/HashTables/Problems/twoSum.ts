/*
 * run npx ts-node 2-DataStructures\HashTables\Problems\twoSum.ts
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * https://leetcode.com/problems/two-sum/
 * Time complexity - O(n)
 */

function twoSum(nums: number[], target: number): number[] {
  let diff: Map<number, number> = new Map();
  diff.set(nums[0], 0);
  for (let i = 1; i < nums.length; i++) {
    const need = target - nums[i];
    if (diff.has(need)) {
      return [diff.get(need)!, i];
    }
    diff.set(nums[i], i);
  }
  return [-1, -1];
}

(() => {
  let nums = [2, 7, 11, 15],
    target = 9; // [0,1]
  let result = twoSum(nums, target);
  console.log(
    `In [${nums}] following indices sums upto ${target}: [${result}]`
  );

  (nums = [3, 2, 4]), (target = 6); // [1,2]
  result = twoSum(nums, target);
  console.log(
    `In [${nums}] following indices sums upto ${target}: [${result}]`
  );

  (nums = [3, 3]), (target = 6); // [0,1]
  result = twoSum(nums, target);
  console.log(
    `In [${nums}] following indices sums upto ${target}: [${result}]`
  );
})();
