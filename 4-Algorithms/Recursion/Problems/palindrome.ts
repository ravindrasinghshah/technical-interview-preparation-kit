/**
 * cd to Recursion and run npx ts-node palindrome.ts
 */

function palindrome(n: number) {
  function isPalindrome(n: number) {
    if (Math.floor(n / 10) === 0) return true;
    let s = Math.floor(n / Math.pow(10, Math.floor(Math.log10(n))));
    let e = n % 10;
    //console.log(s, e)
    if (s !== e) return false;
    n = Math.floor(n / 10);
    //   console.log(n)
    n = n % Math.pow(10, Math.floor(Math.log10(n)));
    //   console.log(n)
    return isPalindrome(n);
  }
  return isPalindrome(n);
}

(() => {
  let num = 12321;
  let result = palindrome(num);
  console.log(`Is ${num} a palindrome? ${result}`);

  num = 12310211;
  result = palindrome(num);
  console.log(`Is ${num} a palindrome? ${result}`);
})();
