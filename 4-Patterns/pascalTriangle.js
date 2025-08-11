/**
 * cd to Patterns folder and then run "node pascalTriangle.js"
 * https://leetcode.com/problems/pascals-triangle/
    1 
  1   1 
 1  2  1 
1  3  3  1
 */

function pascalTriangle(n) {
  let triangle = []; triangle.push([1]);
  console.log(triangle);
  for (let i = 1; i < n; i++) {
    const prevRow = triangle[triangle.length - 1];
    const row = []; row.push(1);
    for (let k = 1; k < prevRow.length; k++) {
      row.push(prevRow[k - 1] + prevRow[k]);
    }
    row.push(1);
    triangle.push(row);
    console.log(triangle[triangle.length - 1])
  }

  return triangle;
}

let rows = 5; //== [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(`Pascal Triangle for ${rows} :`);
let result = pascalTriangle(rows);

rows = 6; //== [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(`Pascal Triangle for ${rows} :`);
result = pascalTriangle(rows);