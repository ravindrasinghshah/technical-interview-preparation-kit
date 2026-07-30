/**
 * cd to Sorting folder and then run "npx ts-node mergeSort.ts"
 * Merge sort
 * Worst case complexity - O(nlog(n))
 * https://www.geeksforgeeks.org/dsa/merge-sort/
 */

import { Log } from "../../../Log";

function mergeSort(arr: Array<number>): Array<number> {
  if (arr.length === 1) return arr;
  let middleIndex = Math.floor(arr.length / 2);
  let left = arr.slice(0, middleIndex);
  let right = arr.slice(middleIndex);
  //== recursive call will slice the array to very last unit
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: Array<number>, right: Array<number>): Array<number> {
  let arr: Array<number> = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift()!);
    } else {
      arr.push(right.shift()!);
    }
  }
  return [...arr, ...left, ...right];
}

(() => {
  const nums = [100, -40, 500, -124, 0, 21, 7];
  Log.info(`Array provided: ${nums}`);
  const result = mergeSort(nums);
  Log.info(`Sorted array: ${result}`);
})();
