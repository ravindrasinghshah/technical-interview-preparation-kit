/**
 * cd to BinarySearch folder and then run "npx ts-node index.ts"
   BinarySearch is a searching algorithm, which is usually done on an array of sorted elements.
 * Worst case complexity - O(log n)
 */

function binarySearch(nums: Array<number>, target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const midIndex = Math.floor((left + right) / 2); //== floor - rounds down to the nearest integer.

    if (nums[midIndex] === target) return midIndex;
    //== value is in the left half of the array
    if (nums[midIndex] > target) right = midIndex - 1;
    //== value is in the right half of the array
    else left = midIndex + 1;
  }
  return left;
}

(() => {
  const nums = [1, 2, 3, 5, 7, 10];
  console.log(`Array provided: ${nums}`);
  const result1 = binarySearch(nums, 7);
  console.log(`Target found on index: ${result1}`);

  const result2 = binarySearch(nums, 17);
  console.log(`${17} not in array, insertion index: ${result2}`);

  const result3 = binarySearch(nums, 4);
  console.log(`${4} not in array, insertion index: ${result3}`);
})();
