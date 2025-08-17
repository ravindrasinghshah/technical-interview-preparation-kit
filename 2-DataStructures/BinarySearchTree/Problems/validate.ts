/**
 * run "npx ts-node 2-DataStructures\BinarySearchTree\Problems\validate.ts"
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
function validate_dfs(
  node: Node,
  min: number | null = null,
  max: number | null = null
): boolean {
  if (min !== null && node.data < min) {
    return false;
  } else if (max !== null && node.data > max) {
    return false;
  }

  if (node.left) return !validate_dfs(node.left, min, node.data);
  if (node.right) return !validate_dfs(node.right, node.data, max);
  return true;
}

//== Depth First Search - new recursive function
function validate_dfs_2(root: Node): boolean {
  function dfs(node: Node | null, min: number, max: number): boolean {
    if (node === null || node === undefined) return true;
    if (node.data <= min || node.data >= max) return false;
    return dfs(node.left, min, node.data) && dfs(node.right, node.data, max);
  }
  return dfs(root, -Infinity, Infinity);
}

//== Breadth First Search
function validate_bfs(root: Node) {
  let queue = [root];
  while (queue.length) {
    let len = queue.length;
    let nextQ = [];

    for (let i = 0; i < len; i++) {
      let node = queue[i];
      if (node.left) {
        if (node.data < node.left.data) return false;
        nextQ.push(node.left);
      }
      if (node.right) {
        if (node.data > node.right.data) return false;
        nextQ.push(node.right);
      }
    }
    queue = nextQ;
  }
  return true;
}

(() => {
  let root = new Node(2);
  root.insert(1);
  root.insert(0);
  root.insert(3);
  root.insert(5);
  console.log("BST 1: ", root);
  const result1 = validate_bfs(root);
  console.log("Is BST 1 valid? ", result1);
  root.left = new Node(10);
  console.log("BST 2: ", root);
  const result2 = validate_bfs(root);
  console.log("Is BST 2 valid? ", result2);
})();
