/**
 * cd to Recursion/array and run npx ts-node 3-Patterns\5-Recursion\Problems\isArraySorted.ts
 */

export function isArraySorted(nums: Array<number>) {
  function isSorted(arr: Array<number>, i: number): boolean {
    //== base condition: traversed all indexes
    if (i >= arr.length - 1) return true;
    //== recursive relation
    return arr[i] < arr[i + 1] && isSorted(arr, ++i);
  }
  return isSorted(nums, 0);
}

