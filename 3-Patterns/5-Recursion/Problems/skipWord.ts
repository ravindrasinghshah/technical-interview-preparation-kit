/**
 * run npx ts-node 3-Patterns\5-Recursion\Problems\skipWord.ts
 * Skip word from a string
 * TC: O(n) - size of the string
 */

export function skipWord(str: string | null, word: string): string {
  if (str === null || str === "") return "";

  if (str.startsWith(word)) return skipWord(str.substring(word.length), word);
  else return str[0] + skipWord(str.substring(1), word);
}

