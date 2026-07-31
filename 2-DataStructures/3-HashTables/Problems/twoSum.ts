/*
 * run npx ts-node 2-DataStructures\3-HashTables\Problems\twoSum.ts
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * https://leetcode.com/problems/two-sum/
 * Time complexity - O(n)
 */

export function twoSum(nums: number[], target: number): number[] {
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

