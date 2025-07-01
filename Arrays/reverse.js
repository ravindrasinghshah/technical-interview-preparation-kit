/**
 * cd to Arrays folder and then run "node reverse.js"
 * Swap item in array
 * Worst case complexity - O(1)
 */

function reverse(nums) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++; right--;
    }
    console.log(`Reverse is [${nums}]`);
}

let nums = [1, 2, 3, 4, 5];
reverse(nums);
console.log("-----------------------------------");
nums = [6, 7, 8, 9];
reverse(nums);