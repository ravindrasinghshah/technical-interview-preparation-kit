/**
 * run npx ts-node 2-DataStructures\Strings\Problems\printSubSequence.ts
 */

//== TC = O(2^n) - This results in a binary tree with height n and 2^n leaf nodes, each representing a subsequence.
function printSubSequence(seq: string, str: string): void {
  if (!str) {
    if (seq && seq !== undefined) console.log(seq);
    return;
  }
  const char = str[0];
  printSubSequence(seq + char, str.substring(1));
  printSubSequence(seq, str.substring(1));
}

(() => {
  let seq = "",
    str = "abc";
  printSubSequence(seq, str); //== a, b, c, ab, ac, bc, abc

  (seq = ""), (str = "abcd");
  printSubSequence(seq, str);
})();
