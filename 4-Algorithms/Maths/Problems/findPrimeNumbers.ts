/**
 * cd to Maths folder and then run "npx ts-node findPrimeNumbers.ts"
 * SC O(n) - TC O(n * log(log n)) (Harmonic progression of primes)
 */

import { Log } from "../../../Log";

function findPrimeNumbers(num: number) {
  let nums = Array(num + 1).fill(0);
  for (let i = 2; i * i <= num; i++) {
    //== pattern - after square root number, it repeats the digits.
    if (nums[i] === 0) {
      for (let j = i * 2; j < nums.length; j += i) {
        nums[j] = 1;
      }
    }
  }
  let res = [];
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] === 0) res.push(i);
  }
  Log.info(`Prime numbers in range from 1 - ${num} : ${res.toString()} `);
}

(() => {
  let n = 40;
  findPrimeNumbers(n);
})();
