/**
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * complexity - O(n log k)
 */
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

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

export { top_k_frequent_elements };
