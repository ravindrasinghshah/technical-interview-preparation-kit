/**
 * run "npx ts-node 2-DataStructures\BinarySearchTree\Problems\invert.ts"
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

function invertBinaryTree(root: Node | null): Node | null {
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

(() => {
  let root = new Node(4);
  root.insert(2);
  root.insert(1);
  root.insert(3);
  root.insert(7);
  root.insert(8);
  root.insert(6);
  console.log("Binary Tree: ", root);
  let result = invertBinaryTree(root); //=  [4,2,7,1,3,6,8] --> [4,7,2,8,6,3,1]
  console.log("Inverted Tree: ", result);
})();
