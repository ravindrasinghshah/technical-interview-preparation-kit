/**
 * cd to Backtracking folder and then run "node subset.js"
Given an integer array nums of unique elements, return all subsets in any order without duplicates.
This is a very common method of avoiding duplicates in backtracking problems
 - having an integer argument that represents a starting point for iteration at each function call.
 * Time Complexity - O(N∗2N)
 */

function subset(nums) {
    function backtracking(arr, depth) {
        //== base case to break the recursion
        if (depth > nums.length) { return; }
        //=== every array passed is a subset;
        ans.push([...arr]);
        //== for each element call backtracking and pop once returned
        for (let i = depth; i < nums.length; i++) {
            if (!arr.includes(nums[i])) {
                arr.push(nums[i]);
                backtracking(arr, i + 1); //== when passing +1 then it ensures to pass only elements after this for all future calls in subtree
                arr.pop();
            }
        }
    }

    let ans = [];
    backtracking([], 0);
    return ans;
}

let nums = [1, 2, 3];
console.log(`Array provided: ${nums}`);
let result = subset(nums);
console.log(`Subset:`, result);

nums = [2, 3, 5, 7, 0, 1];
console.log(`Array provided: ${nums}`);
result = subset(nums);
console.log(`Subset:`, result);