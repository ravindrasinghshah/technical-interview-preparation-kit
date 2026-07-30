/**
 * "npx ts-node 3-Patterns\7-Searching\Problems\LinearSearch\findLengthOfDigits.ts"
 */

import { Log } from "../../../../Log";

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
  Log.info(`Length of ${nums} is: ${result}`);

  nums = 98;
  result = findLengthOfDigits(nums);
  Log.info(`Length of ${nums} is: ${result}`);
})();
