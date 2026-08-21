import dfs_maximum_difference_between_node_and_ancestor from "../Problems/dfs-maximum-difference-between-node-and-ancestor";
import { createBinaryTree } from "../../../2-DataStructures/test-helpers";

/**
 *      8
      /   \
     3     10
    / \      \
   1   6      14
      / \     /
     4   7   13
 */
it("Test case 1", () => {
    const arr = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];
    let root = createBinaryTree(arr);
    const ans = dfs_maximum_difference_between_node_and_ancestor(root);
    expect(ans).toBe(7);
});