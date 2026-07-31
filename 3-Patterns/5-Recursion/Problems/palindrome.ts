/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\palindrome.ts
 */

export function palindrome(n: number) {
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

