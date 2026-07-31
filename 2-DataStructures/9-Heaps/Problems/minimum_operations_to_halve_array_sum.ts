/**
 * https://leetcode.com/problems/minimum-operations-to-halve-array-sum/description/
 * You are given an array nums of positive integers. In one operation, you can choose any number from nums and reduce it to exactly half the number. 
 * (Note that you may choose this reduced number in future operations.)
    Return the minimum number of operations to reduce the sum of nums by at least half.
 * complexity - O(k log n)
 */
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function minimum_operations_to_halve_array_sum(nums: number[]): number {
  let heap = new MaxPriorityQueue<number>(null, nums);
  let curr_sum = nums.reduce((a, v) => a + v, 0);
  let half_sum = curr_sum / 2;
  let ops = 0;

  while (heap.size() && curr_sum > half_sum) {
    let num = heap.dequeue()! / 2;
    heap.enqueue(num);
    curr_sum -= num;
    ops++;
  }
  return ops;
}
export { minimum_operations_to_halve_array_sum };
