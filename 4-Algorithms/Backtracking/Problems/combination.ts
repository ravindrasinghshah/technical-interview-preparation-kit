/**
 * run "npx ts-node 4-Algorithms\Backtracking\Problems\combination.ts"
 * Given two integers n and k, return all combinations of k numbers out of the range [1, n] in any order.
 * Time Complexity - O(k × C(n, k)) [combinations of k elements from n]
 * https://leetcode.com/problems/combinations/
 */

import { Log } from "../../../Log";

function combinations(n: number, k: number): Array<number>[] {
  function backtracking(arr: Array<number>, depth: number) {
    //== base case to break the recursion
    if (arr.length === k) {
      ans.push([...arr]);
      return;
    }

    //== for each element call backtracking and pop once returned
    for (let i = depth; i <= n; i++) {
      if (!arr.includes(i)) {
        arr.push(i);
        backtracking(arr, i + 1); //== when passing +1 then it ensures to pass only elements after this for all future calls in subtree
        arr.pop();
      }
    }
  }

  let ans: Array<number>[] = [];
  backtracking([], 1);
  return ans;
}

(() => {
  let n = 4,
    k = 2;
  Log.info(`Number provided: ${n} and combinations of: ${k}`);
  let result = combinations(n, k);
  Log.info(`Combinations: ${result.length}`, result);

  (n = 6), (k = 3);
  Log.info(`Number provided: ${n} and combinations of: ${k}`);
  result = combinations(n, k);
  Log.info(`Combinations: ${result.length}`, result);
})();
