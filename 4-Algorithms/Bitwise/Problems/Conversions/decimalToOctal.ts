/**
 * cd to Bitwise/Conversions folder and then run "npx ts-node decimalToOctal.ts"
 * Convert decimal number to octal number
 * Octal numbers: 0, 1, 2, 3, 4, 5, 6, 7 - Base 8
 */

function decimalToOctal(num: number) {
  let base8 = "";
  while (num >= 1) {
    base8 = (num % 8).toString() + base8;
    num = Math.floor(num / 8);
  }
  return base8;
}

(() => {
  let n = 4;
  let result = decimalToOctal(n);
  console.log(`Number ${n} in octal is ${result}`);
  n = 9;
  result = decimalToOctal(n);
  console.log(`Number ${n} in octal is ${result}`);
  n = 17;
  result = decimalToOctal(n);
  console.log(`Number ${n} in octal is ${result}`);
  n = 18;
  result = decimalToOctal(n);
  console.log(`Number ${n} in octal is ${result}`);
  n = 14698;
  result = decimalToOctal(n);
  console.log(`Number ${n} in octal is ${result}`);
})();
