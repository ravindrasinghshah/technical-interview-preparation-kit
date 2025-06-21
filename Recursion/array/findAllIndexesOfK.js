/**
 * cd to Recursion/array and run node findAllIndexesOfK.js
 */

function findAllIndexesOfK(nums, target) {
    function findElement(arr, i, indexes) {
        //== base condition: traversed all indexes
        if (i >= arr.length) return indexes;
        if (arr[i] === target) indexes.push(i);
        return findElement(arr, ++i, indexes);
    }
    let allIndexes = findElement(nums, 0, []);
    return allIndexes;
}

let nums = [1, 2, 4, 8, 10]; let target = 8;
let result = findAllIndexesOfK(nums, target);
console.log(`Index position of ${target} in [${nums}] array is: [${result}]`);

nums = [1, 2, 4, 5, 1]; target = 1;
result = findAllIndexesOfK(nums, target);
console.log(`Index position of ${target} in [${nums}] array is: [${result}]`);
