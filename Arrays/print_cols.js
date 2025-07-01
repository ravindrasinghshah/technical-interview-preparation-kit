/**
 * cd to Arrays folder and then run "node print_cols.js"
 * Size of individual row (i.e. columns) doesn't matter.
 * Length of array is number of rows.
 * Worst case complexity - O(n*m)
 */

function print_cols(nums) {
    for (let i = 0; i < nums.length; i++) {
        let columns = [];
        for (let row = 0; row < nums.length; row++) {
            if (nums[row][i])
                columns.push(nums[row][i]);
        }
        console.log("Items in column ", i, " : ", columns);
    }
}

let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
print_cols(nums);
console.log("-----------------------------------");
nums = [[1, 2, 3], [4, 5], [7, 8, 9]];
print_cols(nums);