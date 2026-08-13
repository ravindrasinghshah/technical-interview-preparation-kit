# Code templates available to practice

### Two pointers: one input, opposite ends

```
let fn = arr => {
    let left = 0, ans = 0, right = arr.length - 1;

    while (left < right) {
        // do some logic here with left and right
        if (CONDITION) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
}
```

### Two pointers: two inputs, exhaust both

```
let fn = (arr1, arr2) => {
    let i = 0, j = 0, ans = 0;

    while (i < arr1.length && j < arr2.length) {
        // do some logic here
        if (CONDITION) {
            i++;
        } else {
            j++;
        }
    }

    while (i < arr1.length) {
        // do logic
        i++;
    }

    while (j < arr2.length) {
        // do logic
        j++;
    }

    return ans;
}
```

### Sliding window

```
let fn = arr => {
    let left = 0, ans = 0, curr = 0;

    for (let right = 0; right < arr.length; right++) {
        // do logic here to add arr[right] to curr

        while (WINDOW_CONDITION_BROKEN) {
            // remove arr[left] from curr
            left++;
        }

        // update ans
    }

    return ans;
}
```

### Build a prefix sum

```
let fn = arr => {
    let prefix = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        prefix.push(prefix[prefix.length - 1] + arr[i]);
    }

    return prefix;
}
```

### Efficient string building

```
// arr is a list of characters
let fn = arr => {
    let ans = [];
    for (const c of arr) {
        ans.push(c);
    }

    return ans.join("")
}

let fn = arr => {
    let ans = "";
    for (const c of arr) {
        ans += c;
    }

    return ans;
}
```

### Linked list: fast and slow pointer

```
let fn = head => {
    let slow = head;
    let fast = head;
    let ans = 0;

    while (fast && fast.next) {
        // do logic
        slow = slow.next;
        fast = fast.next.next;
    }

    return ans;
}
```

### Reversing a linked list

```
let fn = head => {
    let curr = head;
    let prev = null;
    while (curr) {
        let nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
}
```

### Find number of subarrays that fit an exact criteria

```
let fn = (arr, k) => {
    let counts = new Map();
    counts.set(0, 1);
    let ans = 0, curr = 0;

    for (const num of arr) {
        // do logic to change curr
        ans += counts.get(curr - k) || 0;
        counts.set(curr, (counts.get(curr) || 0) + 1);
    }

    return ans;
}
```

### Monotonic increasing stack

```
let fn = arr => {
    let stack = [];
    let ans = 0;

    for (const num of arr) {
        // for monotonic decreasing, just flip the > to <
        while (stack.length && stack[stack.length - 1] > num) {
            // do logic
            stack.pop();
        }

        stack.push(num);
    }

    return ans;
}
```

### Binary tree: DFS (recursive)

```
let dfs = root => {
    if (!root) {
        return;
    }

    let ans = 0;

    // do logic
    dfs(root.left);
    dfs(root.right);
    return ans;
}
```

### Binary tree: DFS (iterative)

```
let dfs = root => {
    let stack = [root];
    let ans = 0;

    while (stack.length) {
        let node = stack.pop();
        // do logic
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }

    return ans;
}
```

### Binary tree: BFS

```
let fn = root => {
    let queue = [root];
    let ans = 0;

    while (queue.length) {
        let currentLength = queue.length;
        // do logic for current level

        let nextQueue = [];

        for (let i = 0; i < currentLength; i++) {
            let node = queue[i];
            // do logic
            if (node.left) {
                nextQueue.push(node.left);
            }
            if (node.right) {
                nextQueue.push(node.right);
            }
        }

        queue = nextQueue;
    }

    return ans;
}
```
