# Introduction

Binary Search Tree (BST) are trees in which node can have left and right child. The weight of nodes are such that left node will never have a weight greater than parent node and right node will always have a number greater than parent node.

` left_node < parent_node < right_node`

# BST Traversing

Tree traversing can de done using "Breadth First Search" (BFS) or "Depth First Search" (DFS).

## BFS

In this approach all nodes at same level are traversed first and then next row. (left to right)
General template of implementing BFS is using a queue data-structure.

```
let queue = [root];

while(queue.length){
    const len = queue.length;
    let next_queue = [];
    for(let i=0; i < len; i++){
        const node = queue[i];

        if(node.left){ next_queue.push(node.left); }
        if(node.right){ next_queue.push(node.right); }
    }
    queue = next_queue;
}
```

## DFS

In this approach tree is traversed first to the left depth.
Recursive functions are used to implement DFS - which uses stacks behind the scene.
General template of implementing DFS:

```
function dfs(node){
    if(node === null) return;

    if(node.left) dfs(node.left);
    if(node.right) dfs(node.right);
}
```

You may choose preorder, inorder, or postorder DFS, the important thing is that you just visit all nodes.

### Preorder traversal

In this approach first logic is performed on the current node, then left and right child called.
parent --> left_child --> right_child

### Inorder traversal

In this approach you first recursively call the left child, then perform logic on the current node and then recursively call the right child.
left_child --> parent --> right_child

### Postorder traversal

In this approach first left and right child are called recursively and then logic is performed on current node.
left_child --> right_child --> parent

```
Pre -> before children

In -> in the middle of children

Post -> after children
```
