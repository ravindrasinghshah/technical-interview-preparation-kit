/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
 💡 using null delimiter for levels, once level is done then add null again.
*/

import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function bfs_binary_tree_zigzag_level_order_traversal(
  root: Node | null,
): number[][] {
  let res: number[][] = [];
  if (!root) return res;

  let queue = [root, null];
  let left_to_right = true;
  let levelNodes: number[] = [];

  while (queue.length) {
    let node = queue.shift();
    if (node) {
      if (left_to_right) levelNodes.push(node.data);
      else levelNodes.unshift(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    } else {
      res.push(levelNodes);
      levelNodes = [];
      if (queue.length) queue.push(null);
      left_to_right = !left_to_right;
    }
  }

  return res;
}

/**
 * In this technique use head pointer to keep track of the queue length
 * Move head when read node values
 */
export function bfs_binary_tree_zigzag_level_order_traversal_advance(
  root: Node | null,
): number[][] {
  let res: number[][] = [];
  if (!root) return res;

  let queue = [root];
  let left_to_right = true;
  let head = 0; // head pointer

  while (head < queue.length) {
    let levelSize = queue.length - head;
    let levelVals = new Array(levelSize);

    for (let i = 0; i < levelSize; i++) {
      let node = queue[head++];
      if (node) {
        if (left_to_right) levelVals[i] = node.data;
        else levelVals[levelSize - 1 - i] = node.data; // to put from right end of array

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    res.push(levelVals);
    left_to_right = !left_to_right;
  }

  return res;
}
