/**
 * cd to 4-Exercises/CyclicSort folder and then run "npx ts-node findErrorNums.ts"
 * Cyclic sort is applicable when array values are continuous. 
   https://leetcode.com/problems/set-mismatch/
   Q: You have a set of integers s, which originally contains all the numbers from 1 to n.
   Find the number that occurs twice and the number that is missing and return them in the form of an array.
 * Tip: 
 *      If range is [0,N] then every element will be at index = value [0,1,2,3,4...N] -> N+1 values;
 *      If range is [1,N] then element will be at index = value - 1; [1,2,3,4...N] -> N values;
 */

function findErrorNums(arr: Array<number>) {
  let idx = 0;
  while (idx < arr.length) {
    const correctIndex = arr[idx] - 1;
    if (arr[idx] !== arr.length && arr[idx] != arr[correctIndex]) {
      const temp = arr[idx];
      arr[idx] = arr[correctIndex];
      arr[correctIndex] = temp;
    } else idx++;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i + 1) {
      return [arr[i], i + 1];
    }
  }
  return [-1, -1];
}

(() => {
  let nums = [1, 2, 2, 4]; // [2,3]
  let result = findErrorNums(nums);
  console.log(`[${nums}] : ${result}`);

  nums = [1, 1]; // [1,2]
  result = findErrorNums(nums);
  console.log(`[${nums}] : ${result}`);
})();
