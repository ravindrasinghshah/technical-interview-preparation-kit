/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\countdownReverse.ts
 */

import { Log } from "../../../Log";

function countdownReverse(n: number) {
  if (n === 0) {
    return;
  }
  countdownReverse(n - 1);
  Log.info(n);
}

(() => {
  countdownReverse(10);
})();
