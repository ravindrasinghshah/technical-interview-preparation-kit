/**
 * cd to algos folder and then run "npx ts-node findLengthOfDigits.ts"
 */

function findLengthOfDigits(nums: number) {
  let count = 0;
  while (nums > 0) {
    count++;
    nums = Math.floor(nums / 10);
  }
  return count;
}

(() => {
  let nums = 15647;
  let result = findLengthOfDigits(nums);
  console.log(`Length of ${nums} is: ${result}`);

  nums = 98;
  result = findLengthOfDigits(nums);
  console.log(`Length of ${nums} is: ${result}`);
})();
