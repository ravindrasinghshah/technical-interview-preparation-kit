/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree
 * Given the root of a binary tree, return its maximum depth.
   A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */

import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function dfs_maximum_depth_of_binary_tree(
  root: Node | null,
): number {
  if (!root) return 0;

  let left = dfs_maximum_depth_of_binary_tree(root.left);
  let right = dfs_maximum_depth_of_binary_tree(root.right);
  // post order traversal - as all the logic is done after visiting the children
  return 1 + Math.max(left, right);
}
