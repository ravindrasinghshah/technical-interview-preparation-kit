### Heaps

Heap data structure is an implementation of an abstract data structure "Priority Queue".

[!WARNING]
Javascript doesn't have any built-in support for a heap. To solve heap problems will use [datastructures-js](https://datastructures-js.info/docs/heap)

#### Time complexity of operations

| Operation                  | Complexity |
| -------------------------- | ---------- |
| Add an element             | O(log n)   |
| Remove the minimum element | O(log n)   |
| Find the minimum element   | O(1)       |

A heap can also find the max elements instead of the min elements. If a heap is configured to find/remove the min element, it's called a min heap. If it's configured to find/remove the max element, it's called a max heap.

There are multiple ways to implement a heap, the most popular way is a binary tree that dictates a specific ordering relationship between a parent node and its children.
Which means, if its a min heap then root node will be the smallest value, and same constraint is maintained in all nodes.

```
If A is the parent of B, A.val <= B.val
```

Another constraint is that the tree must be a [**complete tree**](https://en.wikipedia.org/wiki/Binary_tree#complete) (a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.)

### Formula

Parent-child relationship are done using math with the indices. Then first element at index 0 is the root, at 1 index is left child and 2 index is right child. Elements at index 3 and 4 are the children of node at index 1 and so on.

```
node at index i has children at indices 2i + 1 and 2i + 2
```