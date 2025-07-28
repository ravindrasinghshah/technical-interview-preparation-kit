/**
 * cd to Sorting folder and then run "node selectionSort.js"
 * Selection sort
 * Selection sort is a simple, in-place comparison-based sorting algorithm that works by repeatedly finding the minimum element 
 * from the unsorted portion of the array and swapping it with the first element of that portion.
 * Worst case complexity - O(n^2)
 * https://www.geeksforgeeks.org/dsa/selection-sort-algorithm-2/
 */

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] < arr[j]) { minIndex = j; }
        }
        if (minIndex !== i) {
            const lesser = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = lesser;
        }
    }
    return arr;
}

const nums = [100, -40, 500, -124, 0, 21, 7];
console.log(`Array provided: ${nums}`);
const result = selectionSort(nums);
console.log(`Sorted array: ${result}`);