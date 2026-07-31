/**
 * run "npx ts-node 2-DataStructures\2-Arrays\Problems\rotateMatrix.ts"
 * rotate matrix by 90degree
 * https://leetcode.com/problems/rotate-image/
 * Worst case complexity - O(n^2)
 * 1, 2, 3     7, 4, 1
 * 4, 5, 6 --> 8, 5, 2
 * 7, 8, 9     9, 6, 3
 */

import { Log } from "../../../Log";

export function rotateMatrix(matrix: Array<number>[]) {
  let len = matrix.length;
  //== transpose
  for (let row = 0; row < len; row++) {
    for (let col = row + 1; col < len; col++) {
      [matrix[row][col], matrix[col][row]] = [
        matrix[col][row],
        matrix[row][col],
      ];
    }
  }
  //== reverse/reflect
  for (let row = 0; row < len; row++) {
    let s = 0,
      e = len - 1;
    while (s < e) {
      const temp = matrix[row][s];
      matrix[row][s] = matrix[row][e];
      matrix[row][e] = temp;
      s++;
      e--;
    }
  }
  Log.info(JSON.stringify(matrix));
}

