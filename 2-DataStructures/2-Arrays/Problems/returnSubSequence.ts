//== TC = O(2^n) - This results in a binary tree with height n and 2^n leaf nodes, each representing a subsequence.
export function returnSubSequence(str: string, seq: string = ""): string[] {
  if (!str) {
    if (seq) return [seq];
    return [];
  }
  const char = str[0];
  let leftArr = returnSubSequence(str.substring(1), seq + char);
  let rightArr = returnSubSequence(str.substring(1), seq);
  return [...leftArr, ...rightArr];
}

