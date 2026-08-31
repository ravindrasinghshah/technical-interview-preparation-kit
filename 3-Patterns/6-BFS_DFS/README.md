# Breadth First Search (BFS)

Breadth first search (BFS) is used to traverse the nodes in a tree or a graph.

As a general rule of thumb, whenever a problem requires traversing nodes level by level, BFS is the default choice.

## How to implement BFS?

BFS can be implemented using Queue data structure. Because in a queue, data is processed in the order of its added i.e. FIFO, and this is what is required in the BFS.The node added first to the queue is processed first.

## What type of problems use BFS?

Whenever the problem is asking about the shortest path, look at the tree views, zigzag problems.

## BFS code variation?

In the first approach, shift the first item from the queue array and then process the node (Let’s call it approach shift). This is useful when we do not need to worry about the level to level traversing. A simple example is, find the deepest leaves sum.
The second approach is where code needs to know about the level of the node to do logic (Lets call it a level approach). In this, first note the length of the queue, then loop through the nodes in the current level, do the logic, and check if the current node has left or right child and add it in the queue. Example problem is, find the maximum node values’ in current level.

## Code Complexity?

Time complexity of BFS depends on Vertices (V) and Edges (E) - O(V+E), which holds for the best, average and worst cases.
The auxiliary space is O(V), as BFS typically uses a queue to keep track of the vertices to visit.

## Code Template

### Shift approach

```
const bfs_shift = (root) =>{
let ans = 0;
if(!root) return ans;

let queue = [root];
while(queue.length) {
let node = queue.shift();
 if(node){
  // do logic, update ans
  ans += node.val;
  if(node.left) queue.push(node.left);
  if(node.right) queue.push(node.right);
 }
}
return ans;
}
```

### Level approach

```
const bfs_level = (root) =>{
let ans = 0;
if(!root) return ans;

let queue = [root];
while(queue.length) {
let levelSize = queue.length;
let nextQ = [];
for(let i = 0; i< levelSize; i++) {
 let node = queue[i];
 if(node) {
   // do logic, update ans
  ans += node.val;
  if(node.left) nextQ.push(node.left);
  if(node.right) nextQ.push(node.right);
}
}
queue = nextQ;
}
return ans;
}
```

## Common problems to solve

- [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/description/)
- [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/)
- [Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/description/)
- [Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/description/)

# Depth First Search

Depth first search (DFS) is used to traverse the nodes in a tree or a graph.

As a general rule of thumb, whenever a problem requires traversing nodes by dpeth, DFS is the default choice.

## How to implement DFS?

DFS can be implemented using iterative (stack) or recursion. Recursion becomes an easy choice once you understand recursion and comfortable using it.
Recursion makes a call stack and execute based on it is pushed into the call-stack and pop it out once processing of added function is done.

## What type of problems use DFS?

Whenever the problem is asking about the longest path, size of the tree, diameter or nodes comparison in traversal path.

## DFS code variation?

There are 3 ways to perform DFS (It rarely matters which order is used to solve the problem):

- Preorder: Logic is done before calling the children
- Inorder: Logic is done in the middle i.e. after calling left children
- Postorder: Logic is done after calling the children

Bottom-up aggregation is one of the most fundamental design pattern for binary tree problems,
and DFS is a perfect technique to use in such scenario.

In tree problems, a parent node cannot determine its own height, size or path -- without knowing the result from its subtrees.
By diving down to the base call (leaf nodes or null) and bubbling values back up the call stack,
solves the problems in O(n) time instead of repeatedly calculating top-down with O(n^2).

## Code Complexity?

Time complexity of it depends on Vertices (V) and Edges (E) - O(V+E), which holds for the best, average and worst cases.
The auxiliary space is O(V), as DFS uses stack to keep track of the vertices to visit.

## Code Template

### Preorder

In preorder traversal, logic is done on the current node before moving to the children. Let's say that we wanted to just print the value of each node in the tree to the console. In that case, at any given node, we would print the current node's value, then recursively call the left child, then recursively call the right child.

input: [1,2,3,4,5,6,7] --> output: [1,2,4,5,3,6,7]

```
const preorder_dfs = (root) => {
  if(!root) return;

  console.log(root.val);

  preorder_dfs(root.left);
  preorder_dfs(root.right);

  return;
}
```

### Inorder

For inorder traversal, we first recursively call the left child, then perform logic (print in this case) on the current node, and then recursively call the right child. This means no logic will be done until we reach a node without a left child since calling on the left child takes priority over performing logic.

input: [1,2,3,4,5,6,7] --> output: [4,2,5,1,6,3,7]

```
const inorder_dfs = (root) => {
  if(!root) return;

 inorder_dfs(root.left);
 console.log(root.val);
 inorder_dfs(root.right);

 return;
}
```

### Postorder

In postorder traversal, we recursively call on the children first and then perform logic on the current node. This means no logic will be done until we reach a leaf node since calling on the children takes priority over performing logic. In a postorder traversal, the root is the last node where logic is done.

input: [1,2,3,4,5,6,7] --> output: [4,5,2,6,7,3,1]

```
const postorder_dfs = (root) => {
  if(!root) return;

 postorder_dfs(root.left);
 postorder_dfs(root.right);
 console.log(root.val);

 return;
}
```

## Common problems to solve

- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)
- [Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/)
- [Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/)
- [Diameter of binary tree](https://leetcode.com/problems/diameter-of-binary-tree/)
