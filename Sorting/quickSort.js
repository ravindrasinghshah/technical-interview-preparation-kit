/**
 * cd to Sorting folder and then run "node quickSort.js"
QuickSort is a sorting algorithm based on the Divide and Conquer.
It picks an element as a pivot & partitions the given array around the pivot by placing the pivot in its correct position in the sorted array.
 * Worst case complexity - O(n^2)
 */

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = [], right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) { left.push(arr[i]); }
        else { right.push(arr[i]); }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const nums = [2, 3, 5, 7, 0, 1];
console.log(`Array provided: ${nums}`);
const result = quickSort(nums);
console.log(`Sorted array: ${result}`);