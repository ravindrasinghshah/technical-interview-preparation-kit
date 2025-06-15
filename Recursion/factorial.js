/**
 * cd to Recursion and run node factorial.js
 */

function factorial(n) {
    if (n === 0) { return 1; }
    return n * factorial(n - 1);
}

let num = 4;
let result = factorial(num);
console.log(`factorial of ${num} is ${result}`);