/**
 * run "npx ts-node 2-DataStructures\9-Heaps\Problems\top_k_frequent_elements.ts"
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * complexity - O(n log k)
 */
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";
import { Log } from "../../../Log";

function top_k_frequent_elements(nums: number[], k: number): number[] {
  let freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  let heap = new MaxPriorityQueue<[number, number]>({
    compare: (a, b) => b[1] - a[1],
  });

  let ans: number[] = [];
  for (const [k, v] of freq) {
    heap.enqueue([k, v]);
  }
  for (let i = 0; i < k; i++) {
    const [n] = heap.dequeue()!;
    ans.push(n);
  }
  return ans;
}

(() => {
  let nums = [1, 1, 1, 2, 2, 3],
    k = 2; // output [1,2]
  let result = top_k_frequent_elements(nums, k);
  Log.info("Minimum operations required: " + result);
  Log.info("-----------------------------------");

  ((nums = [1]), (k = 1)); // output [1]
  result = top_k_frequent_elements(nums, k);
  Log.info("Minimum operations required: " + result);
  Log.info("-----------------------------------");

  ((nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2]), (k = 2)); // output [1,2]
  result = top_k_frequent_elements(nums, k);
  Log.info("Minimum operations required: " + result);
  Log.info("-----------------------------------");
})();
