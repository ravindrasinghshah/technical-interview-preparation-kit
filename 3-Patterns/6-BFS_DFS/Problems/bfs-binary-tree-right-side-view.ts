/**
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
 * Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
 */
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

export function bfs_binary_tree_right_side_view(root: Node | null): number[] {
  if (!root) return [];

  let ans: number[] = [];
  let queue = [root];
  while (queue.length) {
    let nodesInCurrentLevel = queue.length;
    const rightMostNodeVal = queue[nodesInCurrentLevel - 1].data;
    ans.push(rightMostNodeVal);

    let nextQ = [];
    for (let i = 0; i < nodesInCurrentLevel; i++) {
      const node = queue[i];

      if (node.left) nextQ.push(node.left);
      if (node.right) nextQ.push(node.right);
    }
    queue = nextQ;
  }
  return ans;
}
