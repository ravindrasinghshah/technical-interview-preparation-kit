/**
 * cd to Recursion/array and run node checkIfExist.js
 */

function checkIfExist(nums, target) {
    function findElement(arr, i) {
        //== base condition: traversed all indexes
        if (i >= arr.length) return false;
        return arr[i] === target || findElement(arr, ++i);
    }
    return findElement(nums, 0);
}

let nums = [1, 2, 4, 8, 10]; let target = 8;
let result = checkIfExist(nums, target);
console.log(`Does ${target} exist in [${nums}] array? ${result}`);

nums = [1, 2, 4, 5, 1]; target = 0;
result = checkIfExist(nums, target);
console.log(`Does ${target} exist in [${nums}] array? ${result}`);
