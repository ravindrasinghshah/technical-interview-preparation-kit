import { Tree, TreeNode } from "../Problems";

describe("TreeNode and Tree", () => {
  it("adds and removes child nodes", () => {
    const root = new TreeNode(1);
    root.add(2);
    root.add(3);
    root.remove(2);
    const tree = new Tree();
    tree.root = root;
    expect(tree.root.children.map((node) => node.data)).toEqual([3]);
  });
});
