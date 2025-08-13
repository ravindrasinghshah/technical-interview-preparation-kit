/**
 * cd to Bitwise/NumberSystem folder and then run "npx ts-node findUniqueNumber.ts"
 */

function findUniqueNumber(nums: Array<number>) {
  let unique = 0;
  for (const num of nums) {
    unique ^= num;
    console.log(num, unique);
  }
  return unique;
}
(() => {
  let nums = [1, 2, 3, 4, 3, 2, 5, 1, 4];
  let result = findUniqueNumber(nums);
  console.log(`Unique number in [${nums}] is ${result}`);
})();
