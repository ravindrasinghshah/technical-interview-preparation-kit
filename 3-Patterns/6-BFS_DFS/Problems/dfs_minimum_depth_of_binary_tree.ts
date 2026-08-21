/**
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/description/?envType=problem-list-v2&envId=d4jat9tt
 * Given a binary tree, find its minimum depth.
   The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
   Note: A leaf is a node with no children.
 */
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function dfs_minimum_depth_of_binary_tree(
  root: Node | null,
): number {
  if (!root) return 0;

  if (!root.left) return 1 + dfs_minimum_depth_of_binary_tree(root.right);
  if (!root.right) return 1 + dfs_minimum_depth_of_binary_tree(root.left);

  let left = dfs_minimum_depth_of_binary_tree(root.left);
  let right = dfs_minimum_depth_of_binary_tree(root.right);

  return 1 + Math.min(left, right);
}
