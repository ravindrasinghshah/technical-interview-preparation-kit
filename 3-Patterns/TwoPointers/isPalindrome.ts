/**
 * run "npx ts-node 3-Patterns\TwoPointers\isPalindrome.ts"
   Palindrome is a string which is same after reversing characters.
 */

function isPalindrome(str: string) {
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    const left = str[start];
    const right = str[end];
    if (left !== right) return false;
    start++;
    end--;
  }
  return true;
}

(() => {
  const str = "1001";
  const result = isPalindrome(str);
  console.log(`Is ${str} palindrome? ${result}`);
})();
