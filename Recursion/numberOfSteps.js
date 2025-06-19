/**
 * cd to Recursion and run node numberOfSteps.js
 */

function numberOfSteps_s(n, steps = 0) {
    if (n === 0) { return steps; }
    if (n % 2 === 0) return numberOfSteps(n / 2, ++steps);
    else return numberOfSteps(n - 1, ++steps);
}

function numberOfSteps(n) {
    if (n === 0) { return 0; }
    if (n % 2 === 0) return 1 + numberOfSteps(n / 2);
    else return 1 + numberOfSteps(n - 1);
}

let num = 5;
let result = numberOfSteps(num);
console.log(`Total zeros in ${num} is ${result}`);

num = 10;
result = numberOfSteps(num);
console.log(`Total zeros in ${num} is ${result}`);
