/**
 * cd to Recursion/array and run npx ts-node 3-Patterns\5-Recursion\Problems\findKthElement.ts
 */

export function findKthElement(nums: Array<number>, target: number) {
  function findElement(arr: Array<number>, i: number) {
    //== base condition: traversed all indexes
    if (i >= arr.length) return -1;
    if (arr[i] === target) return i;
    return findElement(arr, ++i);
  }
  return findElement(nums, 0);
}

