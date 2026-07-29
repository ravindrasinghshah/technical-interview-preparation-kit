/**
 * cd to Patterns folder and then run "npx ts-node printDiamond.ts"
 *
 *   *
 *  *  *
 *   *
 *
 */

import { Log } from "../../Log";

function printDiamond(n: number) {
  for (let row = 1; row < 2 * n; row++) {
    let rowPattern = "";
    const cols = row > n ? 2 * n - row : row;
    const spaces = n - cols;
    for (let s = 1; s <= spaces; s++) {
      rowPattern += " ";
    }
    for (let col = 1; col <= cols; col++) {
      rowPattern += "* ";
    }
    Log.info(rowPattern);
  }
}

(() => {
  printDiamond(5);
})();
