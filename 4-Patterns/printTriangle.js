/**
 * cd to Patterns folder and then run "node printTriangle.js"
    * 
  *   * 
 *  *  * 
 */

function printTriangle(n) {
  for (let row = 1; row <= n; row++) {
    let rowPattern = '';
    const spaces = n - row;
    for (let s = 1; s <= spaces; s++) { rowPattern += " "; }
    for (let col = 1; col <= row; col++) { rowPattern += "* "; }
    console.log(rowPattern);
  }
}
printTriangle(5);