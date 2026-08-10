/**
   Palindrome is a string which is same after reversing characters.
 */

export default function isPalindrome(str: string): boolean {
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
