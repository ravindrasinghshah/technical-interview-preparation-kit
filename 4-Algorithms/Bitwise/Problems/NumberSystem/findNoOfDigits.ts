/**
 * run "npx ts-node 4-Algorithms/Bitwise/Problems/NumberSystem/findNoOfDigits.ts"
 * Complexity - log n
 */

import { Log } from "../../../../Log";

function findNoOfDigits(num: number) {
  return Math.floor(Math.log10(num)) + 1;
}
//== for any base use formula to divide log of num by log of base and add 1
function findNoOfDigitsByFormula(num: number, base: number) {
  return Math.floor(Math.log(num) / Math.log(base)) + 1;
}

(() => {
  let n = 2;
  let result = findNoOfDigits(n);
  Log.info(`Number of digits ${n} has ${result}`);

  n = 50;
  result = findNoOfDigits(n);
  Log.info(`Number of digits ${n} has ${result}`);

  n = 900;
  result = findNoOfDigits(n);
  Log.info(`Number of digits ${n} has ${result}`);

  n = 3000;
  result = findNoOfDigits(n);
  Log.info(`Number of digits ${n} has ${result}`);

  n = 14698;
  result = findNoOfDigitsByFormula(n, 10);
  Log.info(`Number of digits ${n} has in decimal ${result}`);

  n = 14698;
  result = findNoOfDigitsByFormula(n, 2);
  Log.info(`Number of digits ${n} has in binary ${result}`);

  n = 14698;
  result = findNoOfDigitsByFormula(n, 8);
  Log.info(`Number of digits ${n} has in octal ${result}`);
})();
