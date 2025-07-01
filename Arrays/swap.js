/**
 * cd to Arrays folder and then run "node swap.js"
 * Swap item in array
 * Worst case complexity - O(1)
 */

function swap(nums, index1, index2) {
    const temp = nums[index1];
    nums[index1] = nums[index2];
    nums[index2] = temp;
    console.log(nums);
}

let nums = [1, 2, 3, 4, 5];
swap(nums, 0, 4);
console.log("-----------------------------------");
nums = [6, 7, 8, 9];
swap(nums, 3, 2);