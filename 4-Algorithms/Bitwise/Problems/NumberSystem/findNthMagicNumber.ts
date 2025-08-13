/**
 * cd to Bitwise/NumberSystem folder and then run "npx ts-node findNthMagicNumber.ts"
 * A magic number is defined as a number which can be expressed as a power of 5 or sum of unique powers of 5.
 * First few magic numbers are 5, 25, 30(5 + 25), 125, 130(125 + 5), ....
 * Write a function to find the nth Magic number.
 * https://www.geeksforgeeks.org/dsa/find-nth-magic-number/
 */

function findNthMagicNumber(num: number) {
  let base = 5,
    ans = 0;
  while (num > 0) {
    let lastDigit = num & 1;
    ans += lastDigit * base;
    num = num >> 1;
    base = base * 5;
  }
  return ans;
}
(() => {
  let n = 2;
  let result = findNthMagicNumber(n);
  console.log(`Magic number of ${n} is ${result}`);

  n = 5;
  result = findNthMagicNumber(n);
  console.log(`Magic number of ${n} is ${result}`);
})();
