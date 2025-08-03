### Helper functions to solve algorithm

#### [Helper Functions (->)](maths.md)

### Topics

1. Intervals - merge intervals, meetings, schedule, max appointments etc.
2. Doubly linked List - LRU, Reverse Linked List etc.
3. String compressions - occurences of character (e.g. a2b3c1), encode decode string
4. Hashmap/Set based problems
5. Cyclic Sort for O(n) result in range based array (1,n)
6. Recursion - DFS, BFS, Fibonacci, Factorial etc.
7. Arrays, Matrix 2D - rotate 90 degree
8. Stacks and Queues - paranthesis, monotonic
9. Binary Search - order agnostic, rotated, pivot

### Patterns

#### Binary Search

1. Peak element in array
2. Pivot element in array
3. Order agnostic search
4. Find element in rotated array
5. 2D array search

#### Sorting

1. Cyclic Sort - Use it when given range (1,N) - this algo takes O(n) complexity.
   - find missing number, duplicate numbers etc.

### Code Templates

#### Two Pointers

One input, opposite ends.

```
l = 0, h = arr.length, ans = [];
while(l < h){
    if(condition){
        l++;
    }
    h++;
}
return ans;
```

Two input, exhaust both.

```
i = 0, j= 0, ans = [];
while(i < arr1.length && j < arr2.length){
    if(condition) i++;
    else j++;
}
while(i < arr1.length){
    i++;
}
while(j < arr2.length){
    j++;
}
return ans;
```

#### Sliding Window

```
l = 0, ans = [];
for(let r = 0, r < arr.length; r++){
    //== add right value to curr
    while(condition_broken){
    //== remove left value from curr
     l++;
    }
}
return ans;
```

#### Prefix Sum

```
preSum = [arr[0]];
for(let i = 1; i < arr.length; i++){
    preSum.push(preSum[preSum.length - 1] + arr[i]);
}
return preSum;
```

#### [Binary Search (->)](../Searching/BinarySearch/index.js)

```
l = 0, h = arr.length - 1;
while(l <= h ){
    mid = Math.floor((l+h)/2);
    if(arr[mid] === target) return mid;
    if(arr[mid] > target) r = mid - 1;
    else l = mid + 1;
}
return l;
```

#### Binary Tree - Depth First Search (recursive)

```
if(root == null) return;
//== logic
dfs(root.left);
dfs(root.right);
return ans;
```

#### Binary Tree - DFS (iterative)

```
let stack = [root];
while(stack.length){
  const node = stack.pop();
  if(node.left) stack.push(node.left);
  if(node.right) stack.push(node.right);
}
return ans;
```

#### Binary Tree - Breadth First Search

```
let queue = [root];
while(queue.length){
    const len = queue.length;
    let nextQ = [];
    for(let i = 0; i < len; i++){
        const node = queue[i];
        if(node.left) nextQ.push(node.left);
        if(node.right) nextQ.push(node.right);
    }
    queue = nextQ;
}
return ans;
```
