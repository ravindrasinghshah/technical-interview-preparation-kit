import dfs_diameter_of_binary_tree from "../Problems/dfs_diameter_of_binary_tree";
import { createBinaryTree } from "../../../2-DataStructures/test-helpers";
import { expect } from "vitest";

it("Test case 1", () => {
    const arr = [1, 2, 3, 4, 5];
    const root = createBinaryTree(arr);
    const ans = dfs_diameter_of_binary_tree(root);

    expect(ans).toBe(3);
});

it("Test case 2", () => {
    const arr = [1, 2];
    const root = createBinaryTree(arr);
    const ans = dfs_diameter_of_binary_tree(root);

    expect(ans).toBe(1);
});

it("Test case 3", () => {
    const arr = [3, 4, 5, null, null, null, 6, null, 7, null, 8];
    const root = createBinaryTree(arr);
    const ans = dfs_diameter_of_binary_tree(root);

    expect(ans).toBe(5);
});