/**
 * run "npx ts-node 4-Algorithms\Backtracking\Problems\permutation.ts"
Backtracking is an algorithm which uses recursion for solving problem.
Its a way to efficiently run through all possibilities in a problem.
Backtracking is a great tool whenever a problem wants you to find all of something, 
or there isn't a clear way to find a solution without checking all logical possibilities.
 * Worst case complexity - O(N!∗N^2)
 */

function permutation(nums: Array<number>): Array<number>[] {
  function backtracking(arr: Array<number>) {
    //== base case to break the recursion
    if (arr.length === nums.length) {
      ans.push([...arr]);
      return;
    }
    //== for each element call backtracking and pop once returned
    for (const num of nums) {
      if (!arr.includes(num)) {
        arr.push(num);
        backtracking(arr);
        arr.pop();
      }
    }
  }

  let ans: Array<number>[] = [];
  backtracking([]);
  return ans;
}

(() => {
  let nums = [1, 2, 3];
  console.log(`Array provided: ${nums}`);
  let result = permutation(nums);
  console.log(`Permutations:`, result);

  nums = [2, 3, 5, 7, 0, 1];
  console.log(`Array provided: ${nums}`);
  result = permutation(nums);
  console.log(`Permutations:`, result);
})();
