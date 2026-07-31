import { Node } from "../Problems";

describe("BST Node", () => {
  it("inserts and locates values", () => {
    const root = new Node(5);
    [3, 7, 1].forEach((value) => root.insert(value));
    expect(root.contains(1)?.data).toBe(1);
    expect(root.contains(8)).toBeNull();
  });
});
