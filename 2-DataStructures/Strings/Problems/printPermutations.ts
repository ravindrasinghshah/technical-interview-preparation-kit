/**
 * run npx ts-node 2-DataStructures\Strings\Problems\printPermutations.ts
 */

import { Log } from "../../../Log";

//== TC = O(n!)
function printPermutations(str: string, processed: string = ""): void {
  if (!str) {
    Log.info(processed.trim());
    return;
  }
  const char = str[0];
  Log.debug("char:", char);
  for (let i = 0; i <= processed.length; i++) {
    let first = processed.substring(0, i);
    let second = processed.substring(i, processed.length);
    Log.debug(
      `for char: ${char} | i: ${i} | first: ${first} | second: ${second} `
    );
    printPermutations(str.substring(1), first + char + second);
  }
}

(() => {
  let str = "abc";
  printPermutations(str); //== cba,bca,bac,cab,acb,abc;
})();
