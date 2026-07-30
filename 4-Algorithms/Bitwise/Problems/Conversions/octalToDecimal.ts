/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\Conversions\octalToDecimal.ts"
 * Convert octalToDecimal to decimal - Multiple and add power of base with digit in reverse order and increment power of base with every number.
 * Note: Number has limit of 2^53 - 1 (~16 digits) - for more length number use string.
 */

import { Log } from "../../../../Log";

function octalToDecimal(num: number) {
  let decimal = 0;
  let n = 0;
  while (num > 0) {
    const lastDigit = num % 10;
    decimal += lastDigit * Math.pow(8, n);
    n++;
    num = Math.floor(num / 10);
  }
  return decimal;
}

(() => {
  let n = 21;
  let result = octalToDecimal(n);
  Log.info(`Octal ${n} in decimal is ${result}`);

  n = 15;
  result = octalToDecimal(n);
  Log.info(`Octal ${n} in decimal is ${result}`);
})();
