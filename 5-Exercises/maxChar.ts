/**
 * run "npx ts-node 5-Exercises\maxChar.ts"
   Given a string, return the character that is most commonly used in the string.
   Examples:
    maxChar("abcccccccd") === "c"
    maxChar("apple 1231111") === "1"
 */

import { Log } from "../Log";

function maxChar(str: string) {
  let m = new Map();
  for (const char of str) {
    m.set(char, (m.get(char) || 0) + 1);
  }

  let max = 0,
    char = "";
  for (const [k, v] of m) {
    if (v > max) {
      max = v;
      char = k;
    }
  }
  return char;
}
(() => {
  let str = "abcccccccd";
  let result = maxChar(str);
  Log.info(`${str} - most commonly used: ${result}`);

  str = "apple 1231111";
  result = maxChar(str);
  Log.info(`${str} - most commonly used: ${result}`);
})();
