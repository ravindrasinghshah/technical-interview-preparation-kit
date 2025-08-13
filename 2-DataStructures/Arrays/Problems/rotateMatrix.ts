/**
 * cd to Arrays folder and then run "npx ts-node rotateMatrix.ts"
 * rotate matrix by 90degree
 * https://leetcode.com/problems/rotate-image/
 * Worst case complexity - O(n^2)
 * 1, 2, 3     7, 4, 1
 * 4, 5, 6 --> 8, 5, 2
 * 7, 8, 9     9, 6, 3
 */

function rotateMatrix(matrix: Array<number>[]) {
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
  console.log(matrix);
}

(() => {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]; // [[7,4,1],[8,5,2],[9,6,3]]
  console.log(`# Rotate matrix`, matrix);
  rotateMatrix(matrix);

  matrix = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ]; // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
  console.log(`# Rotate matrix`, matrix);
  rotateMatrix(matrix);
})();
