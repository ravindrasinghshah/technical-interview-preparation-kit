### Arrays

An array is a data structure used to store multiple elements. Arrays can be single or multi-dimensional (2d).

#### Time complexity of array operations

| Operation            | Method   | Complexity |
| -------------------- | -------- | ---------- |
| Append to end        | push()   | O(1)       |
| Popping from end     | pop()    | O(1)       |
| Insert, not from end | splice() | O(n)       |
| Delete, not from end | splice() | O(n)       |
| Modify an element    | by index | O(1)       |
| Random access        | by index | O(1)       |
| Check if exists      | traverse | O(n)       |

### Subarray

A contiguous part of an array.

```
Example: [1, 2, 3] => [1, 2], [2, 3]
```

### Subset

A collection of elements from an array in order. It can be solved using recursion or iteration.

```
Example: [1, 2, 3] => [1], [1, 2], [1, 2, 3], [2], [2, 3], [3]
```
