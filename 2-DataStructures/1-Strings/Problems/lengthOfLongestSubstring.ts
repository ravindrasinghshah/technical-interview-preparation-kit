/**
 * run "npx ts-node 2-DataStructures\1-Strings\Problems\lengthOfLongestSubstring.ts"
 * Given a string s, find the length of the longest substring without duplicate characters.
 * A substring is a contiguous non-empty sequence of characters within a string.
 *  https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 */

export function lengthOfLongestSubstring(s: string): number {
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

