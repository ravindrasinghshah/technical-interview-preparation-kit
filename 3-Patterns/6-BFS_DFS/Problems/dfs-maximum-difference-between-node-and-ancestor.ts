/**
 * https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/
 * Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.
A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.
💡 Carry currMax and currMin values to each recursive call and then once node has reached last then calculate the value and return. 
*/

import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export default function dfs_maximum_difference_between_node_and_ancestor(
  root: Node | null,
): number {
  if (!root) return 0;

  function dfs(node: Node | null, currMax: number, currMin: number): number {
    if (!node) return currMax - currMin;

    currMax = Math.max(currMax, node.data);
    currMin = Math.min(currMin, node.data);
    let left = dfs(node.left, currMax, currMin);
    console.log("left", node.data, left);
    let right = dfs(node.right, currMax, currMin);
    console.log("right", node.data, right);
    return Math.max(right, left);
  }

  const ans = dfs(root, root.data, root.data);
  return ans;
}
