import { Node } from "../Problems";
import { validate_bfs, validate_dfs, validate_dfs_2 } from "../Problems/validate";

describe("BST validation", () => {
  it("accepts valid trees and rejects invalid descendants", () => {
    const root = new Node(5);
    [3, 7, 1, 4, 6, 8].forEach((value) => root.insert(value));
    expect(validate_dfs(root)).toBe(true);
    expect(validate_dfs_2(root)).toBe(true);
    expect(validate_bfs(root)).toBe(true);
    root.left.right = new Node(9);
    expect(validate_dfs(root)).toBe(false);
    expect(validate_dfs_2(root)).toBe(false);
    expect(validate_bfs(root)).toBe(false);
  });
});
