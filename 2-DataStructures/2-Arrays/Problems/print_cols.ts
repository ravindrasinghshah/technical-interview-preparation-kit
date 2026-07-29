/**
 * run "npx ts-node 2-DataStructures\Arrays\Problems\print_cols.ts"
 * Size of individual row (i.e. columns) doesn't matter.
 * Length of array is number of rows.
 * Worst case complexity - O(n*m)
 */
import { Log } from "../../../Log";
function print_cols(nums: number[][]) {
  for (let i = 0; i < nums.length; i++) {
    let columns = [];
    for (let row = 0; row < nums.length; row++) {
      if (nums[row][i]) columns.push(nums[row][i]);
    }
    Log.info("Items in column ", i, " : ", columns);
  }
}

(() => {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  print_cols(matrix);
  Log.info("-----------------------------------");
  matrix = [
    [1, 2, 3],
    [4, 5],
    [7, 8, 9],
  ];
  print_cols(matrix);
})();
