/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\findSetBits.ts"
 * Find the set bits of binary number
 * Complexity log n
 */

import { Log } from "../../../../Log";

function findSetBits(num: number) {
  let count = 0;
  while (num > 0) {
    count++;
    num = num & (num - 1);
  }
  return count;
}

(() => {
  let num = 4; // 100 -> 1
  let result = findSetBits(num);
  Log.info(
    `Decimal number ${num} binary format is ${num.toString(
      2
    )} and set bits are ${result}`
  );

  num = 40; // 101000 -> 2
  result = findSetBits(num);
  Log.info(
    `Decimal number ${num} binary format is ${num.toString(
      2
    )} and set bits are ${result}`
  );
})();
