/**
 * cd to Patterns folder and then run "npx ts-node printTriangle.ts"
 *
 *   *
 *  *  *
 */

import { Log } from "../../Log";

function printTriangle(n: number) {
  for (let row = 1; row <= n; row++) {
    let rowPattern = "";
    const spaces = n - row;
    for (let s = 1; s <= spaces; s++) {
      rowPattern += " ";
    }
    for (let col = 1; col <= row; col++) {
      rowPattern += "* ";
    }
    Log.info(rowPattern);
  }
}

(() => {
  printTriangle(5);
})();
