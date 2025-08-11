/**
 * cd to 4-Exercises/CyclicSort folder and then run "node findMissingNumber.js"
 * Cyclic sort is applicable when array values are continuous. 
   https://leetcode.com/problems/missing-number/
   Q: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 * Tip: 
 *      If range is [0,N] then every element will be at index = value [0,1,2,3,4...N] -> N+1 values;
 *      If range is [1,N] then element will be at index = value - 1; [1,2,3,4...N] -> N values;
 */

function findMissingNumber(arr) {
    let idx = 0;
    while (idx < arr.length) {
        const correctIndex = arr[idx];
        if (nums[idx] !== arr.length &&
            nums[idx] !== nums[correctIndex]) {
            //== swap
            const temp = nums[idx];
            nums[idx] = nums[correctIndex];
            nums[correctIndex] = temp;
        }
        else idx++;
    }
    //== search missing number
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != i) return i;
    }
    return arr.length;
}

let nums = [3, 0, 1]; // 2
let result = findMissingNumber(nums);
console.log(`[${nums}] : ${result}`);

nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]; // 8
result = findMissingNumber(nums);
console.log(`[${nums}] : ${result}`);

nums = [0, 1]; // 2
result = findMissingNumber(nums);
console.log(`[${nums}] : ${result}`);