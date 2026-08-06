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
