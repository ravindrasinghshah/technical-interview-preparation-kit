/**
 * run npx ts-node 2-DataStructures\Strings\Problems\countAndSay.ts
 * The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
 * countAndSay(1) = "1"
 * countAndSay(n) is the run-length encoding of countAndSay(n - 1).
 * Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run).
 * For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11".
 * Thus the compressed string becomes "23321511".
 * Given a positive integer n, return the nth element of the count-and-say sequence.
 * https://leetcode.com/problems/count-and-say/
 */

import { Log } from "../../../Log";

//== TC = O(n * m) - m is the max length of the str.
function countAndSay(n: number): string {
  let str = "1";
  for (let i = 1; i < n; i++) {
    let newStr = "",
      idx = 0;
    while (idx < str.length) {
      const curr = str[idx];
      let count = 0;
      while (idx < str.length && str[idx] === curr) {
        count++;
        idx++;
      }
      newStr += count.toString() + curr;
    }
    str = newStr;
  }
  return str;
}

(() => {
  let n = 4;
  let result = countAndSay(n); // "1211"
  Log.info(`The ${n} element of count and say is, ${result}`);

  n = 1;
  result = countAndSay(n); // "1"
  Log.info(`The ${n} element of count and say is, ${result}`);
})();
