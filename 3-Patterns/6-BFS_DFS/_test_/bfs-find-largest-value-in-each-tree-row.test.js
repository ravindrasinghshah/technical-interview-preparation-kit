import bfs_find_largest_value_in_each_tree_row from "../Problems/bfs-find-largest-value-in-each-tree-row";
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";
import { expect } from "vitest";

it("Test case 1", () => {
    //[1,3,2,5,3,null,9]
    let root = new Node(1);
    root.left = new Node(3); root.right = new Node(2);
    root.left.left = new Node(5); root.left.right = new Node(3); root.right.right = new Node(9);
    const ans = bfs_find_largest_value_in_each_tree_row(root);
    expect(ans).toEqual([1, 3, 9]);
});

it("Test case 2", () => {
    //[1,2,3]
    let root = new Node(1);
    root.left = new Node(2); root.right = new Node(3);
    const ans = bfs_find_largest_value_in_each_tree_row(root);
    expect(ans).toEqual([1, 3]);
});