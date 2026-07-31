import { Node } from "../Problems";
import { invertBinaryTree } from "../Problems/invert";

describe("invertBinaryTree", () => {
  it("swaps every node's children", () => {
    const root = new Node(4);
    [2, 7, 1, 3, 6, 8].forEach((value) => root.insert(value));
    const inverted = invertBinaryTree(root);
    expect(inverted?.left?.data).toBe(7);
    expect(inverted?.right?.left?.data).toBe(3);
    expect(invertBinaryTree(null)).toBeNull();
  });
});
