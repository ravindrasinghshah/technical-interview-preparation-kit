import bfs_deepest_leaves_sum from "../Problems/bfs-deepest-leaves-sum";
import { Node } from "../../../2-DataStructures/8-BinarySearchTree/Problems"

it("Test case 1", () => {
    //[1,2,3,4,5,null,6,7,null,null,null,null,8]
    let root = new Node(1);
    root.left = new Node(2); root.right = new Node(3);
    root.left.left = new Node(4); root.left.right = new Node(5); root.right.right = new Node(6);
    root.left.left.left = new Node(7); root.right.right.right = new Node(8);

    const ans = bfs_deepest_leaves_sum(root);
    expect(ans).toBe(15);
});


it("Test case 2", () => {
    //[6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
    let root = new Node(6);
    root.left = new Node(7); root.right = new Node(8);
    root.left.left = new Node(2); root.left.right = new Node(7); root.right.left = new Node(1); root.right.right = new Node(3);
    root.left.left.left = new Node(9); root.left.right.left = new Node(1); root.left.right.right = new Node(4); root.right.right.right = new Node(5);

    const ans = bfs_deepest_leaves_sum(root);
    expect(ans).toBe(19);
});