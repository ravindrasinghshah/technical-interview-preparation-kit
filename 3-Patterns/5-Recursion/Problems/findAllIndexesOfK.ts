/**
 * cd to Recursion/array and run npx ts-node 3-Patterns\5-Recursion\Problems\findAllIndexesOfK.ts
 */

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
export function findAllIndexesOfK(nums: Array<number>, target: number): number[] {
  function findElement(arr: Array<number>, i: number) {
    let list: Array<number> = [];
    //== base condition: traversed all indexes
    if (i >= arr.length) return list;
    //== this will only contain answer for this function call only
    if (arr[i] === target) list.push(i);
    let retList: Array<number> = findElement(arr, ++i);

    return [...list, ...retList];
  }
  return findElement(nums, 0);
}
