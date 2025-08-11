/**
 * cd to Patterns folder and then run "node printDiamond.js"
    * 
  *   * 
 *  *  * 
  *   * 
    * 
 */

function printDiamond(n) {
  for (let row = 1; row < (2 * n); row++) {
    let rowPattern = '';
    const cols = ((row > n) ? 2 * n - row : row);
    const spaces = n - cols;
    for (let s = 1; s <= spaces; s++) { rowPattern += " "; }
    for (let col = 1; col <= cols; col++) { rowPattern += "* "; }
    console.log(rowPattern);
  }
}

printDiamond(5);
