/**
 * cd to Arrays folder and then run "node print_max.js"
 * Swap item in array
 * Worst case complexity - O(n)
 */

function print_max(nums) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
        max = Math.max(max, nums[i]);
    }
    console.log(`Max number in [${nums}] is ${max}.`);
}

let nums = [1, 2, 3, 4, 5];
print_max(nums);
console.log("-----------------------------------");
nums = [6, 7, 8, 9];
print_max(nums);

console.log("-----------------------------------");
nums = [-6, -7, -8, -9];
print_max(nums);