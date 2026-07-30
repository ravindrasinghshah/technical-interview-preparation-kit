/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\Conversions\decimalToBase2.ts"
 * Convert decimal number to base 2 number
 */

import { Log } from "../../../../Log";

function decimalToBase2(num: number) {
  let base2 = "";
  while (num >= 1) {
    base2 = (num % 2).toString() + base2;
    num = Math.floor(num / 2);
  }
  return base2;
}

function decimalToBase2_recursion(num: number, remainder: string = "") {
  if (num === 1) return 1;

  remainder = (num % 2) + remainder; //== add latest remainder before
  num = Math.floor(num / 2);
  return decimalToBase2_recursion(num, remainder);
}

(() => {
  let n = 2;
  let result = decimalToBase2(n);
  Log.info(`Number ${n} in base 2 is ${result}`);

  n = 16;
  result = decimalToBase2(n);
  Log.info(`Number ${n} in base 2 is ${result}`);
  n = 17;
  result = decimalToBase2(n);
  Log.info(`Number ${n} in base 2 is ${result}`);
  n = 14698;
  result = decimalToBase2(n);
  Log.info(`Number ${n} in base 2 is ${result}`);
})();
