import dfs_minimum_depth_of_binary_tree from "../Problems/dfs_minimum_depth_of_binary_tree";
import { createBinaryTree } from "../../../2-DataStructures/test-helpers";

it("Test case 1", () => {
    const arr = [3, 9, 20, null, null, 15, 7];
    const root = createBinaryTree(arr);
    const ans = dfs_minimum_depth_of_binary_tree(root);
    expect(ans).toBe(2);
});

it("Test case 2", () => {
    const arr = [2, null, 3, null, 4, null, 5, null, 6];
    const root = createBinaryTree(arr);
    const ans = dfs_minimum_depth_of_binary_tree(root);
    expect(ans).toBe(5);
});