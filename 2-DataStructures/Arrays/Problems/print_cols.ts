/**
 * cd to Arrays folder and then run "npx ts-node print_cols.ts"
 * Size of individual row (i.e. columns) doesn't matter.
 * Length of array is number of rows.
 * Worst case complexity - O(n*m)
 */

function print_cols(nums: number[][]) {
  for (let i = 0; i < nums.length; i++) {
    let columns = [];
    for (let row = 0; row < nums.length; row++) {
      if (nums[row][i]) columns.push(nums[row][i]);
    }
    console.log("Items in column ", i, " : ", columns);
  }
}

(() => {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  print_cols(matrix);
  console.log("-----------------------------------");
  matrix = [
    [1, 2, 3],
    [4, 5],
    [7, 8, 9],
  ];
  print_cols(matrix);
})();
