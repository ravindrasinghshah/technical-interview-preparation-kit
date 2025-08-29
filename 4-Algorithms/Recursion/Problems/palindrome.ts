/**
 * cd to Recursion and run npx ts-node palindrome.ts
 */

import { Log } from "../../../Log";

function palindrome(n: number) {
  function isPalindrome(n: number) {
    if (Math.floor(n / 10) === 0) return true;
    let s = Math.floor(n / Math.pow(10, Math.floor(Math.log10(n))));
    let e = n % 10;
    //Log.info(s, e)
    if (s !== e) return false;
    n = Math.floor(n / 10);
    //   Log.info(n)
    n = n % Math.pow(10, Math.floor(Math.log10(n)));
    //   Log.info(n)
    return isPalindrome(n);
  }
  return isPalindrome(n);
}

(() => {
  let num = 12321;
  let result = palindrome(num);
  Log.info(`Is ${num} a palindrome? ${result}`);

  num = 12310211;
  result = palindrome(num);
  Log.info(`Is ${num} a palindrome? ${result}`);
})();
