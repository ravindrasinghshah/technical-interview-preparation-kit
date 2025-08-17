/**
 * run "npx ts-node 2-DataStructures\HashTables\Problems\groupAnagrams.ts"
 * An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.
 * Time complexity - O(n + w log(w)) -> n - array length, w - word length
 * Space complexity - O(m)
 * https://leetcode.com/problems/group-anagrams/description/
 */

function groupAnagrams(words: Array<string>): Array<string>[] {
  let anagram: Array<string>[] = [],
    dict: Map<string, Array<string>> = new Map();

  for (const word of words) {
    let key = word.split("").sort().join(); //= convert word to array, sort and join
    if (!dict.has(key)) dict.set(key, []);
    dict.get(key)?.push(word);
  }
  for (const [_k, v] of dict) {
    anagram.push(v);
  }
  return anagram;
}

(() => {
  let words = ["eat", "tea", "tan", "ate", "nat", "bat"]; // [["bat"],["nat","tan"],["ate","eat","tea"]]
  console.log(`Words: [${words}]`);
  let anagrams = groupAnagrams(words);
  console.log("Group Anagrams:", anagrams);
})();
