import bfs_binary_tree_zigzag_level_order_traversal, { bfs_binary_tree_zigzag_level_order_traversal_advance } from "../Problems/bfs-binary-tree-zigzag-level-order-traversal";
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems";
import { describe, expect } from "vitest";

it("Test case 1", () => {
    //[3,9,20,null,null,15,7]
    let root = new Node(3);
    root.left = new Node(9); root.right = new Node(20);
    root.right.left = new Node(15); root.right.right = new Node(7);

    const ans = bfs_binary_tree_zigzag_level_order_traversal(root);
    expect(ans).toEqual([[3], [20, 9], [15, 7]]);
});

it("Test case 2", () => {
    //[1]
    let root = new Node(1);
    const ans = bfs_binary_tree_zigzag_level_order_traversal(root);
    expect(ans).toEqual([[1]]);
});

it("Test case 3", () => {
    //[]
    let root = null;
    const ans = bfs_binary_tree_zigzag_level_order_traversal(root);
    expect(ans).toEqual([]);
});

describe("bfs_binary_tree_zigzag_level_order_traversal_advance", () => {

    it("Test case 1", () => {
        //[3,9,20,null,null,15,7]
        let root = new Node(3);
        root.left = new Node(9); root.right = new Node(20);
        root.right.left = new Node(15); root.right.right = new Node(7);

        const ans = bfs_binary_tree_zigzag_level_order_traversal_advance(root);
        expect(ans).toEqual([[3], [20, 9], [15, 7]]);
    });

    it("Test case 2", () => {
        //[1]
        let root = new Node(1);
        const ans = bfs_binary_tree_zigzag_level_order_traversal_advance(root);
        expect(ans).toEqual([[1]]);
    });

    it("Test case 3", () => {
        //[]
        let root = null;
        const ans = bfs_binary_tree_zigzag_level_order_traversal_advance(root);
        expect(ans).toEqual([]);
    });
})