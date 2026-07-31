/**
 * cd to Sorting folder and then run "npx ts-node cyclicSort.ts"
 * Cyclic sort is applicable when array values are continuous.
 * Compares current index with the value-1 and if it doesn't match then swap the elements.
 * Complexity - O(n)
 * https://www.geeksforgeeks.org/dsa/cycle-sort/
 * Tip:
 *      If range is [0,N] then every element will be at index = value [0,1,2,3,4...N] -> N+1 values;
 *      If range is [1,N] then element will be at index = value - 1; [1,2,3,4...N] -> N values;
 */

export function cyclicSort(arr: Array<number>) {
  let i = 0;
  while (i < arr.length) {
    const idx = arr[i] - 1;
    if (arr[i] !== arr[idx]) {
      const temp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = temp;
    } else i++;
  }
  return arr;
}
