/**
 * https://leetcode.com/problems/longest-palindromic-substring/description/
 * Given a string s, return the longest palindromic substring in s.
 */

function expandComparison(str: string, l: number, r: number): string {
  while (l >= 0 && r < str.length && str[l] === str[r]) {
    l--;
    r++;
  }
  return str.substring(l + 1, r); // because substring inlcudes the startIndex and exlcudes the endIndex
}

export default function longest_palindromic_substring(str: string): string {
  let ans = "";
  for (let i = 0; i < str.length; i++) {
    let oddStr: string = expandComparison(str, i, i);
    let evenStr: string = expandComparison(str, i, i + 1);

    if (oddStr.length > ans.length) ans = oddStr;
    if (evenStr.length > ans.length) ans = evenStr;
  }

  return ans;
}
