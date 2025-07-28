/**
 * cd to Sorting folder and then run "node cyclicSort.js"
 * Cyclic sort is applicable when array values are continuous. 
 * Compares current index with the value-1 and if it doesn't match then swap the elements.
 * Complexity - O(n)
 * https://www.geeksforgeeks.org/dsa/cycle-sort/
 */

function cyclicSort(arr) {
    let i = 0;
    while (i < arr.length) {
        const idx = arr[i] - 1;
        if (i !== idx) {
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
        else i++;
    }
    return arr;
}

let nums = [3, 5, 2, 1, 4]; // 1,2,3,4,5
console.log(`[${nums}] sorted: `);
let result = cyclicSort(nums);
console.log(`[${result}]`);

nums = [7, 5, 4, 1, 2, 6, 3]; // 1,2,3,4,5,6,7
console.log(`[${nums}] sorted: `);
result = cyclicSort(nums);
console.log(`[${result}]`);