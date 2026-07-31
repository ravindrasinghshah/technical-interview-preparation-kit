/**
 * https://leetcode.com/problems/last-stone-weight/
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.
   We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. 
   Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
    If x == y, both stones are destroyed, and
    If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
    At the end of the game, there is at most one stone left.
   Return the weight of the last remaining stone. If there are no stones left, return 0.

 * Worst case complexity - 
 */
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";
function last_stone_weight(stones: number[]): number {
  let heap = new MaxPriorityQueue<number>();
  for (const stone of stones) heap.enqueue(stone);

  let ans = 0;
  while (heap.size() > 1) {
    const y: number = heap.dequeue()!;
    const x: number = heap.dequeue()!;
    if (x === y) continue;
    if (x < y) heap.enqueue(y - x);
  }

  if (heap.size() > 0) ans = heap.dequeue()!;

  return ans;
}
export { last_stone_weight };
