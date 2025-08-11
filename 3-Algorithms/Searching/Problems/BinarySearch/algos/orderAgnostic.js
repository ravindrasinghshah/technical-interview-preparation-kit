/**
 * cd to algos folder and then run "node orderAgnostic.js"
   Find the left-most index of duplicate item.
 * Worst case complexity - O(log n)
 */
function orderAgnostic(nums, target) {
    let left = 0, right = nums.length - 1;
    let isAsc = nums[left] < nums[right];
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const num = nums[mid];
        if (num === target) return mid;
        if (isAsc) {
            if (num > target) right = mid - 1;
            else left = mid + 1;
        }
        else {
            if (num > target) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}

const nums = [10, 9, 8, 5, 3], target = 5;
console.log(`Array provided: ${nums}`);
let result = orderAgnostic(nums, target);
console.log(`Index position of ${target} : ${result}`);