/**
 * cd to Patterns folder and then run "npx ts-node printInvertedTriangle.ts"
 *
 *   *
 *  *  *
 */

function printInvertedTriangle(n: number) {
  for (let row = 1; row <= n; row++) {
    let rowPattern = "";
    const cols = n - row;
    const spaces = n - cols;
    for (let s = 1; s <= spaces; s++) {
      rowPattern += " ";
    }
    for (let col = 1; col <= cols; col++) {
      rowPattern += "* ";
    }
    console.log(rowPattern);
  }
}
(() => {
  printInvertedTriangle(5);
})();
