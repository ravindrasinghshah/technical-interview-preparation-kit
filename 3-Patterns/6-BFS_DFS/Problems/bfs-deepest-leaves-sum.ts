/**
 * https://leetcode.com/problems/deepest-leaves-sum/description/
 * Given the root of a binary tree, return the sum of values of its deepest leaves.
 * 💡 In this problem we need to keep track of the levels in the tree, therefore using for loop within while loop. 
 * Use this approach when code needs to know when one level ends and the next begins.
 */

import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function bfs_deepest_leaves_sum(root: Node | null): number {
  if (!root) return 0;
  let ans = 0;

  let queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    ans = 0;
    let nextQ = [];
    for (let i = 0; i < levelSize; i++) {
      let node = queue[i];
      if (node) {
        ans += node.data;

        if (node.left) nextQ.push(node.left);
        if (node.right) nextQ.push(node.right);
      }
    }
    queue = nextQ;
  }
  return ans;
}
