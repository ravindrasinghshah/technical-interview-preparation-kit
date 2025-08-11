/**
 * cd to Recursion/array and run node isArraySorted.js
 */

function isArraySorted(nums) {
    function isSorted(arr, i) {
        //== base condition: traversed all indexes
        if (i === arr.length - 1) return true;
        //== recursive relation
        return (arr[i] < arr[i + 1]) && isSorted(arr, ++i);
    }
    return isSorted(nums, 0);
}

let nums = [1, 2, 4, 8, 10]
let result = isArraySorted(nums);
console.log(`Is [${nums}] array sorted? ${result}`);

nums = [1, 2, 4, 5, 1]
result = isArraySorted(nums);
console.log(`Is [${nums}] array sorted? ${result}`);