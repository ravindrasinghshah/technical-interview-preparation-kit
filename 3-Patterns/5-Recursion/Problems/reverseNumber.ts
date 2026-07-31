/**
 * cd to Recursion and run node 3-Patterns\5-Recursion\Problems\reverseNumber.ts
 */

//== if we have to pass additional values then better create a new function
export function reverseNumber(n: number) {
  let sum = 0;
  function reverse(n: number) {
    if (n % 10 === n && n / 10 === n) return;
    let remainder = n % 10;
    sum = sum * 10 + remainder;
    let reducedN = Math.floor(n / 10);
    reverse(reducedN);
  }
  reverse(n);
  return sum;
}

