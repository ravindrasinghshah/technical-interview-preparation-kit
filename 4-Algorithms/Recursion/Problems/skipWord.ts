/**
 * run npx ts-node 4-Algorithms\Recursion\Problems\skipWord.ts
 * Skip word from a string
 * TC: O(n) - size of the string
 */

import { Log } from "../../../Log";

function skipWord(str: string | null, word: string): string {
  if (str === null || str === "") return "";

  if (str.startsWith(word)) return skipWord(str.substring(word.length), word);
  else return str[0] + skipWord(str.substring(1), word);
}

(() => {
  let str = "recursion_is_noteasy",
    word = "not";
  let result = skipWord(str, word);
  Log.info(`${str} : ${result}`);

  (str = "i_want_to_be_breakfree"), (word = "break");
  result = skipWord(str, word);
  Log.info(`${str} : ${result}`);
})();
