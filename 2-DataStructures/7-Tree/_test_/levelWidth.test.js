import { TreeNode } from "../Problems";
import { levelWidth } from "../Problems/levelWidth";

describe("levelWidth", () => {
  it("returns the number of nodes at each level", () => {
    const root = new TreeNode(0);
    root.add(1);
    root.add(2);
    root.children[0].add(3);
    expect(levelWidth(root)).toEqual([1, 2, 1]);
    expect(levelWidth(null)).toEqual([]);
  });
});
