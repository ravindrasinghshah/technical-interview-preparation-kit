/**
 * cd to Recursion/array and run node findKthElement.js
 */

function findKthElement(nums, target) {
    function findElement(arr, i) {
        //== base condition: traversed all indexes
        if (i >= arr.length) return -1;
        if (arr[i] === target) return i;
        return findElement(arr, ++i);
    }
    return findElement(nums, 0);
}

let nums = [1, 2, 4, 8, 10]; let target = 8;
let result = findKthElement(nums, target);
console.log(`Index position of ${target} in [${nums}] array is: ${result}`);

nums = [1, 2, 4, 5, 1]; target = 4;
result = findKthElement(nums, target);
console.log(`Index position of ${target} in [${nums}] array is: ${result}`);
