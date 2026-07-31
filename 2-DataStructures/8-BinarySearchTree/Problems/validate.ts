/**
 * run "npx ts-node 2-DataStructures\8-BinarySearchTree\Problems\validate.ts"
 * Coding Exercise - Validating Binary Search Trees
Given a node of a binary search tree, validate the binary search tree.
Ensure that every node's left hand child is less than the parent node's value
Ensure that every node's right hand child is greater than the parent

    Example 1:
      2
    /   \
   1      3
  /        \
 0          5
Answer: True

   Example 2:
      2
    /   \
   1      3
  /        \
 4          5
Answer: false
 */

import { Node } from "./index";

//== Depth First Search - recursive
export function validate_dfs(
  node: Node,
  min: number | null = null,
  max: number | null = null
): boolean {
  if (min !== null && node.data < min) {
    return false;
  } else if (max !== null && node.data > max) {
    return false;
  }

  return (
    (!node.left || validate_dfs(node.left, min, node.data)) &&
    (!node.right || validate_dfs(node.right, node.data, max))
  );
}

//== Depth First Search - new recursive function
export function validate_dfs_2(root: Node): boolean {
  function dfs(node: Node | null, min: number, max: number): boolean {
    if (node === null || node === undefined) return true;
    if (node.data <= min || node.data >= max) return false;
    return dfs(node.left, min, node.data) && dfs(node.right, node.data, max);
  }
  return dfs(root, -Infinity, Infinity);
}

//== Breadth First Search
export function validate_bfs(root: Node) {
  let queue: Array<[Node, number, number]> = [[root, -Infinity, Infinity]];
  while (queue.length) {
    const [node, min, max] = queue.shift()!;
    if (node.data <= min || node.data >= max) return false;
    if (node.left) {
      queue.push([node.left, min, node.data]);
    }
    if (node.right) {
      queue.push([node.right, node.data, max]);
    }
  }
  return true;
}

