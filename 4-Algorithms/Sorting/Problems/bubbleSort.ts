/**
 * cd to Sorting folder and then run "npx ts-node bubbleSort.ts"
 * Bubble sort repeatedly steps through a list, compares adjacent elements and swaps them if they are in the wrong order.
 * This process is repeated until the list is sorted.
 * Worst case complexity - O(n^2)
 * https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/
 */

function bubbleSort(arr: Array<number>) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const lesser = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = lesser;
      }
    }
  }
  return arr;
}

(() => {
  const nums = [2, 3, 5, 7, 0, 1];
  console.log(`Array provided: ${nums}`);
  const result = bubbleSort(nums);
  console.log(`Sorted array: ${result}`);
})();
