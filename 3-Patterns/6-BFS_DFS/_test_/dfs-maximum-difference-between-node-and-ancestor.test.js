import dfs_maximum_difference_between_node_and_ancestor from "../Problems/dfs-maximum-difference-between-node-and-ancestor";
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";

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
    //[8,3,10,1,6,null,14,null,null,4,7,13]
    let root = new Node(8);
    root.left = new Node(3); root.right = new Node(10);
    root.left.left = new Node(1); root.left.right = new Node(6); root.right.right = new Node(14);
    root.left.right.left = new Node(4); root.left.right.right = new Node(7); root.right.right.left = new Node(13);

    const ans = dfs_maximum_difference_between_node_and_ancestor(root);
    expect(ans).toBe(7);
});