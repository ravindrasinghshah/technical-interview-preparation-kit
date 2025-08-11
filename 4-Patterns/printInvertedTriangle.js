/**
 * cd to Patterns folder and then run "node printInvertedTriangle.js"
    * 
  *   * 
 *  *  * 
 */


function printInvertedTriangle(n) {
  for (let row = 1; row <= n; row++) {
    let rowPattern = '';
    const cols = n - row;
    const spaces = n - cols;
    for (let s = 1; s <= spaces; s++) { rowPattern += " "; }
    for (let col = 1; col <= cols; col++) { rowPattern += "* "; }
    console.log(rowPattern);
  }
}
printInvertedTriangle(5);
