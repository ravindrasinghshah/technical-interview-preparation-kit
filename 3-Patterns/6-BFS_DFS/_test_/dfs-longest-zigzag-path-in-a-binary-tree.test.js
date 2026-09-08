import dfs_longest_zigzag_path_in_a_binary_tree from "../Problems/dfs-longest-zigzag-path-in-a-binary-tree";
import { createBinaryTree } from "../../../2-DataStructures/test-helpers";

it("Test case 1", () => {
    const arr = [1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1];
    const root = createBinaryTree(arr);
    const ans = dfs_longest_zigzag_path_in_a_binary_tree(root);
    expect(ans).toBe(3);
});

it("Test case 2", () => {
    const arr = [1, 1, 1, null, 1, null, null, 1, 1, null, 1];
    const root = createBinaryTree(arr);
    const ans = dfs_longest_zigzag_path_in_a_binary_tree(root);
    expect(ans).toBe(4);
});

it("Test case 3", () => {
    const arr = [1];
    const root = createBinaryTree(arr);
    const ans = dfs_longest_zigzag_path_in_a_binary_tree(root);
    expect(ans).toBe(0);
});