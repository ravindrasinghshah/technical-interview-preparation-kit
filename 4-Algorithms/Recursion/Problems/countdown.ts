/**
 * cd to Recursion and run npx ts-node countdown.ts
 */

import { Log } from "../../../Log";

function countdown(n: number) {
  if (n === 0) {
    Log.info(n);
    Log.info("~~~ Hurray ~~~");
    return;
  }
  Log.info(n);
  countdown(n - 1);
}

(() => {
  countdown(10);
})();
