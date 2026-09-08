/**
 * https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/
 * Longest ZigZag Path in a Binary Tree
 */
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function dfs_longest_zigzag_path_in_a_binary_tree(
  root: Node | null,
): number {
  let longestPath = 0;

  function preOrderDFS(node: Node | null, len: number, goLeft: boolean) {
    if (!node) return;
    longestPath = Math.max(longestPath, len);

    if (goLeft) {
      preOrderDFS(node.left, len + 1, false);
      preOrderDFS(node.right, 1, true);
    } else {
      preOrderDFS(node.right, len + 1, true);
      preOrderDFS(node.left, 1, false);
    }
  }
  preOrderDFS(root, 0, true);
  return longestPath;
}
