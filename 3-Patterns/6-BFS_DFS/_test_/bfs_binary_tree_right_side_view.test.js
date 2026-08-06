import bfs_binary_tree_right_side_view from "../Problems/bfs-binary-tree-right-side-view";
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";
import { expect } from "vitest";

it("Test case 1", () => {
    //[1,2,3,null,5,null,4]
    let root = new Node(1);
    root.left = new Node(2);
    root.right = new Node(3);
    root.left.right = new Node(5);
    root.right.right = new Node(4);

    let ans = bfs_binary_tree_right_side_view(root);
    expect(ans).toEqual([1, 3, 4])
});

it("Test case 2", () => {
    //[1,2,3,4,null,null,null,5]
    let root = new Node(1);
    root.left = new Node(2);
    root.right = new Node(3);
    root.left.left = new Node(4);

    root.left.left.left = new Node(5);

    let ans = bfs_binary_tree_right_side_view(root);
    expect(ans).toEqual([1, 3, 4, 5])
});

it("Test case 3", () => {
    //[1,null,3]
    let root = new Node(1);
    root.right = new Node(3);

    let ans = bfs_binary_tree_right_side_view(root);
    expect(ans).toEqual([1, 3])
});


it("Test case 4", () => {
    //[]
    let root = null;

    let ans = bfs_binary_tree_right_side_view(root);
    expect(ans).toEqual([])
});
