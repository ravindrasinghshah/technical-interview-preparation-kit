/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\isEven.ts"
 */

import { Log } from "../../../../Log";

function isEven(num: number) {
  return (num & 1) === 0;
}

(() => {
  let n = 21;
  let result = isEven(n);
  Log.info(`Is ${n} an even number? ${result}`);

  n = 22;
  result = isEven(n);
  Log.info(`Is ${n} an even number? ${result}`);
})();
