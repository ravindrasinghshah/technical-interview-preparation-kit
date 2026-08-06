/**
 * https://leetcode.com/problems/find-largest-value-in-each-tree-row/description/
 * Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).
 */

import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function bfs_find_largest_value_in_each_tree_row(
  root: Node | null,
): number[] {
  let res: number[] = [];
  if (!root) return res;
  let queue = [root];
  while (queue.length) {
    let levelSize = queue.length;
    let nextQ = [];
    let maxNodeVal = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < levelSize; i++) {
      let node = queue[i];
      maxNodeVal = Math.max(maxNodeVal, node.data);

      if (node.left) nextQ.push(node.left);
      if (node.right) nextQ.push(node.right);
    }
    queue = nextQ;
    res.push(maxNodeVal);
  }
  return res;
}
