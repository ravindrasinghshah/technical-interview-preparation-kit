/**
 * run "npx ts-node 2-DataStructures\9-Heaps\Problems\find_k_closest_elements.ts"
 * https://leetcode.com/problems/find-k-closest-elements/description/
 * Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.
    An integer a is closer to x than an integer b if:
    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b
 * complexity - O((n+k) . log(k))
 */
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";
import { Log } from "../../../Log";

function find_k_closest_elements(
  nums: number[],
  k: number,
  x: number,
): number[] {
  let heap = new MaxPriorityQueue<number>({
    compare: (a: number, b: number) => {
      if (Math.abs(a - x) === Math.abs(b - x)) return b - a;
      return Math.abs(b - x) - Math.abs(a - x);
    },
  });

  for (const num of nums) {
    heap.enqueue(num);
    if (heap.size() > k) heap.dequeue();
  }

  let ans: number[] = [];
  for (let i = 0; i < k; i++) {
    ans.push(heap.dequeue()!);
  }

  return ans.sort((a, b) => a - b);
}

(() => {
  let nums = [1, 2, 3, 4, 5],
    k = 2,
    x = 3; // output [1,2,3,4]
  let result = find_k_closest_elements(nums, k, x);
  Log.info("Minimum operations required: " + result);
  Log.info("-----------------------------------");

  ((nums = [1, 1, 2, 3, 4, 5]), (k = 4), (x = -1)); // output [1, 1, 2, 3]
  result = find_k_closest_elements(nums, k, x);
  Log.info("Minimum operations required: " + result);
  Log.info("-----------------------------------");
})();
