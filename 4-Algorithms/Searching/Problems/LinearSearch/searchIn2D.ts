/**
 * cd to algos folder and then run "npx ts-node searchIn2D.ts"
 */

import { Log } from "../../../../Log";

function searchIn2D(nums: Array<number>[], target: number) {
  for (let row = 0; row < nums.length; row++) {
    for (let col = 0; col < nums[row].length; col++) {
      const num = nums[row][col];
      if (num === target) return true;
    }
  }
  return false;
}
(() => {
  let nums = [
      [3, 2, 5, 4],
      [8, 1, 9],
    ],
    target = 1;
  let result = searchIn2D(nums, target);
  Log.info(`Does ${target} exists in [${nums}] array? ${result}`);

  (nums = [
    [3, 2, 5, 9],
    [8, -1, -9],
  ]),
    (target = -11);
  result = searchIn2D(nums, target);
  Log.info(`Does ${target} exists in [${nums}] array? ${result}`);
})();
