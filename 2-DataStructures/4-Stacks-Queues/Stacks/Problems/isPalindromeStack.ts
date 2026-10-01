/**
   Palindrome is a string which is same after reversing characters.
 */

export default function isPalindromeStack(str: string): boolean {
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
