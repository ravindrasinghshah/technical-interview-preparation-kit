/**
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

import { TreeNode } from "./index";

export function levelWidth(root: TreeNode | null): number[] {
  if (!root) return [];

  const widths: number[] = [];
  let level = [root];
  while (level.length) {
    widths.push(level.length);
    level = level.flatMap((node) => node.children);
  }
  return widths;
}
