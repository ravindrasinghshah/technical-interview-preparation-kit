/**
 * https://leetcode.com/problems/diameter-of-binary-tree
 * Given the root of a binary tree, return the length of the diameter of the tree.
   The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
   The length of a path between two nodes is represented by the number of edges between them.
 */
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function dfs_diameter_of_binary_tree(root: Node | null): number {
  let diameter = 0;

  function postOrderDFS(node: Node | null): number {
    if (!node) return 0;

    let left = postOrderDFS(node.left);
    let right = postOrderDFS(node.right);

    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }

  postOrderDFS(root);
  return diameter;
}
