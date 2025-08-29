/**
 * cd to Recursion/array and run npx ts-node checkIfExist.ts
 */

import { Log } from "../../../Log";

function checkIfExist(nums: Array<number>, target: number): boolean {
  function findElement(arr: Array<number>, i: number): boolean {
    //== base condition: traversed all indexes
    if (i >= arr.length) return false;
    return arr[i] === target || findElement(arr, ++i);
  }
  return findElement(nums, 0);
}
(() => {
  let nums = [1, 2, 4, 8, 10];
  let target = 8;
  let result = checkIfExist(nums, target);
  Log.info(`Does ${target} exist in [${nums}] array? ${result}`);

  nums = [1, 2, 4, 5, 1];
  target = 0;
  result = checkIfExist(nums, target);
  Log.info(`Does ${target} exist in [${nums}] array? ${result}`);
})();
