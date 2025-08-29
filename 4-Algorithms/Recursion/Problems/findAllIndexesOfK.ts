/**
 * cd to Recursion/array and run npx ts-node findAllIndexesOfK.ts
 */

import { Log } from "../../../Log";

// function findAllIndexesOfK(nums, target) {
//     function findElement(arr, i, indexes) {
//         //== base condition: traversed all indexes
//         if (i >= arr.length) return indexes;
//         if (arr[i] === target) indexes.push(i);
//         return findElement(arr, ++i, indexes);
//     }
//     let allIndexes = findElement(nums, 0, []);
//     return allIndexes;
// }

//== if want to use list within body of recursion, then have to return back and update the calling function list
//==== this is not optimized approach because list is created for each recursive calls.
function findAllIndexesOfK(nums: Array<number>, target: number) {
  function findElement(arr: Array<number>, i: number) {
    let list: Array<number> = [];
    //== base condition: traversed all indexes
    if (i >= arr.length) return list;
    //== this will only contain answer for this function call only
    if (arr[i] === target) list.push(i);
    let retList: Array<number> = findElement(arr, ++i);

    return [...list, ...retList];
  }
  let allIndexes = findElement(nums, 0, []);
  return allIndexes;
}

(() => {
  let nums = [1, 2, 4, 8, 10];
  let target = 8;
  let result = findAllIndexesOfK(nums, target);
  Log.info(`Index position of ${target} in [${nums}] array is: [${result}]`);

  nums = [1, 2, 4, 5, 1];
  target = 1;
  result = findAllIndexesOfK(nums, target);
  Log.info(`Index position of ${target} in [${nums}] array is: [${result}]`);
})();
