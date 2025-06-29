/**
 * cd to algos folder and then run "node sqrt.js"
 * Square root is a number which is multiplied by itself, equals the original number
 * Absolute sqrt value - not precision
 * Worst case complexity - O(log n)
 */

function sqrt(x) {
    if (x < 2) return x;
    let low = 2, high = Math.floor(x / 2);
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const pow = mid * mid;
        if (pow === x) return mid;
        if (pow > x) high = mid - 1;
        else low = mid + 1;
    }
    return high;
}

let num = 8;
let result = sqrt(num);
console.log(`Square root of ${num} is ${result}`);