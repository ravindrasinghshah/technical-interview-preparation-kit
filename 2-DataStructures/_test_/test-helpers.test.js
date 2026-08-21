import { describe, expect, it } from "vitest";
import { binaryTreeToArray, createBinaryTree } from "../test-helpers";

describe("binary tree test helpers", () => {
  it("converts a binary tree to a level-order array", () => {
    const values = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];

    expect(binaryTreeToArray(createBinaryTree(values))).toEqual(values);
  });

  it("converts an empty tree to an empty array", () => {
    expect(binaryTreeToArray(null)).toEqual([]);
  });
});
