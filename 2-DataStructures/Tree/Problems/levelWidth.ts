/**
 * cd to algos folder and then run "npx ts-node levelWidth.ts"
 * Coding Exercise - Level Width
   Given the root node of a tree, return an array where each element is the width of the tree at each level.

    Example:

      0
    / |  \
   1  2   3
   |      |
   4      5
    Answer:

    [1, 3, 2]
 */

import { Tree, TreeNode } from "./index";
//== todo
function levelWidth(root: TreeNode) {}

(() => {
  let tree = new Tree();
  tree.root = new TreeNode(0);
  const one = new TreeNode(1);
  one.add(4);
  const three = new TreeNode(3);
  three.add(5);
  tree.root.children.push(one);
  tree.root.add(2);
  tree.root.children.push(three);

  tree.traverseBF();
})();
