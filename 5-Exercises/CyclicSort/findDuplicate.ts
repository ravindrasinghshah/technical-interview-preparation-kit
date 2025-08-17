/**
 * run "npx ts-node 5-Exercises\CyclicSort\findDuplicate.ts"
 * Cyclic sort is applicable when array values are continuous. 
   https://leetcode.com/problems/find-the-duplicate-number/description/
   Q: Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
      There is only one repeated number in nums, return this repeated number.
 * Tip: 
 *      If range is [0,N] then every element will be at index = value [0,1,2,3,4...N] -> N+1 values;
 *      If range is [1,N] then element will be at index = value - 1; [1,2,3,4...N] -> N values;
 */

function findDuplicate(arr: Array<number>) {
  let idx = 0;
  while (idx < arr.length) {
    if (idx != arr[idx] - 1) {
      const correctIndex = arr[idx] - 1;
      if (arr[idx] !== arr[correctIndex]) {
        const temp = arr[idx];
        arr[idx] = arr[correctIndex];
        arr[correctIndex] = temp;
      } else return arr[idx];
    } else idx++;
  }
  return -1;
}
(() => {
  let nums = [1, 3, 4, 2, 2]; // 2
  let result = findDuplicate(nums);
  console.log(`[${nums}] : ${result}`);

  nums = [3, 1, 3, 4, 2]; // 3
  result = findDuplicate(nums);
  console.log(`[${nums}] : ${result}`);

  nums = [3, 3, 3, 3, 3]; // 3
  result = findDuplicate(nums);
  console.log(`[${nums}] : ${result}`);

  nums = [1, 2, 3, 4, 5]; // -1
  result = findDuplicate(nums);
  console.log(`[${nums}] : ${result}`);
})();
