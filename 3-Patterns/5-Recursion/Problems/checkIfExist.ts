/**
 * cd to Recursion/array and run npx ts-node 3-Patterns\5-Recursion\Problems\checkIfExist.ts
 */

export function checkIfExist(nums: Array<number>, target: number): boolean {
  function findElement(arr: Array<number>, i: number): boolean {
    //== base condition: traversed all indexes
    if (i >= arr.length) return false;
    return arr[i] === target || findElement(arr, ++i);
  }
  return findElement(nums, 0);
}
