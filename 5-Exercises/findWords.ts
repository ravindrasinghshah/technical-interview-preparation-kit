/**
 * run "npx ts-node 5-Exercises\findWords.ts"
 * Given an input list of words and a string, output every different set of words that you can find in the string from the given words.
 * Example:
 * Input: word_list = ['dog', 'cats', 'sand', 'cat', 'and'], string = "catsanddog"
 * output: [ ['cat', 'sand', 'dog'], ['cats', 'and', 'dog'] ]
 */

import { Log } from "../Log";

function findWords(word_list: Array<string>, str: string) {}

(() => {
  let word_list = ["dog", "cats", "sand", "cat", "and"],
    str = "catsanddog";
  let result = findWords(word_list, str);
  Log.info("Words: ", result);
})();
