import dfs_maximum_depth_of_binary_tree from "../Problems/dfs-maximum-depth-of-binary-tree";
import { createBinaryTree } from "../../../2-DataStructures/test-helpers";
import { expect } from "vitest";

it("Test case 1", () => {
    const arr = [3, 9, 20, null, null, 15, 7];
    const root = createBinaryTree(arr);

    const ans = dfs_maximum_depth_of_binary_tree(root);
    expect(ans).toBe(3);
});

it("Test case 2", () => {
    const arr = [1, null, 2];
    const root = createBinaryTree(arr);

    const ans = dfs_maximum_depth_of_binary_tree(root);
    expect(ans).toBe(2);
});