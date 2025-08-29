/**
 * run npx ts-node 2-DataStructures\Arrays\Problems\returnSubSequence.ts
 */

//== TC = O(2^n) - This results in a binary tree with height n and 2^n leaf nodes, each representing a subsequence.
function returnSubSequence(str: string, seq: string = ""): string[] {
  if (!str) {
    if (seq) return [seq];
    return [];
  }
  const char = str[0];
  let leftArr = returnSubSequence(str.substring(1), seq + char);
  let rightArr = returnSubSequence(str.substring(1), seq);
  return [...leftArr, ...rightArr];
}

(() => {
  let str = "abc";
  let result = returnSubSequence(str); //== a, b, c, ab, ac, bc, abc
  console.log(`${str} sequences : [${result}]`);

  str = "abcd";
  result = returnSubSequence(str);
  console.log(`${str} sequences : [${result}]`);
})();
