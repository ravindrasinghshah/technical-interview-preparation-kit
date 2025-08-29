/**
 * run "npx ts-node 2-DataStructures\Strings\Problems\lengthOfLongestSubstring.ts"
 * Given a string s, find the length of the longest substring without duplicate characters.
 * A substring is a contiguous non-empty sequence of characters within a string.
 *  https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 */

import { Log } from "../../../Log";

function lengthOfLongestSubstring(s: string): number {
  let max = 0,
    seen = new Set(),
    left = 0,
    right = 0;

  while (right < s.length) {
    const char = s[right];
    while (seen.has(char)) {
      seen.delete(s[left]);
      left++;
    }
    max = Math.max(max, right - left + 1);
    seen.add(char);
    right++;
  }
  return max;
}

(() => {
  let str = "abcabcbb"; // 3 - abc
  let result = lengthOfLongestSubstring(str);
  // The answer is "abc", with the length of 3.
  Log.info(
    `The length of longest substring for ${str} is, length of ${result}`
  );

  str = "bbbbb"; // 1 - b
  result = lengthOfLongestSubstring(str);
  Log.info(
    `The length of longest substring for ${str} is, length of ${result}`
  );
  str = "pwwkew"; // 3 - wke
  result = lengthOfLongestSubstring(str);
  Log.info(
    `The length of longest substring for ${str} is, length of ${result}`
  );
})();
