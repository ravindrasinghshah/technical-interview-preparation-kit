/**
 * run "npx ts-node 2-DataStructures\8-BinarySearchTree\Problems\invert.ts"
 * Given the root of a binary tree, invert the tree, and return its root.
https://leetcode.com/problems/invert-binary-tree/description/

  Example 1:
      4                 4
    /   \             /   \
   2     7     -->   7     2
  / \   / \         / \   / \ 
 1   3 6   8       8   6 3   1 
 */

import { Node } from "./index";

export function invertBinaryTree(root: Node | null): Node | null {
  if (root === null) return null;
  let queue = [root];
  let inverted = root;
  while (queue.length) {
    const node = queue.shift()!;
    const temp = node.right;
    node.right = node.left;
    node.left = temp;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return inverted;
}

