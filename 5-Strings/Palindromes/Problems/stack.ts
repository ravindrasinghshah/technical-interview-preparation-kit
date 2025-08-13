/**
 * cd to Palindrome folder and then run "npx ts-node stack.ts"
   Palindrome is a string which is same after reversing characters.
 */

function isPalindrome(str: string) {
  let start = 0;
  let end = str.length;
  let mid = Math.floor(end / 2);
  let stack = [];
  for (let i = 0; i <= mid; i++) {
    stack.push(str[i]);
  }
  for (let i = mid; i < end; i++) {
    if (str[i] === stack[stack.length - 1]) {
      stack.pop();
    }
  }
  return stack.length === 0;
}

(() => {
  let str = "10s01";
  let result = isPalindrome(str);
  console.log(`Is ${str} palindrome? ${result}`);

  str = "10sa01";
  result = isPalindrome(str);
  console.log(`Is ${str} palindrome? ${result}`);
})();
