/**
 * run "npx ts-node 3-Patterns\SlidingWindow\containsNearbyDuplicate.ts"
Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k. 
https://leetcode.com/problems/contains-duplicate-ii/description/?envType=problem-list-v2&envId=sliding-window
*/

import { Log } from "../../Log";

function containsNearbyDuplicate(nums: number[], k: number) {
    let window = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (i > k) // if window size > k then slide
            window.delete(nums[i - k - 1]);
        if (window.has(nums[i])) return true;

        window.add(nums[i]);
    }
    return false;
}

(() => {
    let nums = [1, 2, 3, 1]; let k = 3;
    let result = containsNearbyDuplicate(nums, k);
    Log.info(`Nums [${nums}] contains duplicate? ${result}`);

    nums = [1, 2, 3, 1, 2, 3], k = 2;
    result = containsNearbyDuplicate(nums, k);
    Log.info(`Nums [${nums}] contains duplicate? ${result}`);
})();
