/**
 * cd to Recursion and run node sumOfDigits.js
 */

function sumOfDigits(n) {
    if (n === 0) return 0;

    let remainder = n % 10;
    let reducedN = Math.floor(n / 10);
    return sumOfDigits(reducedN) + remainder;
}

let num = 12345;
let result = sumOfDigits(num);
console.log(`sum of digits ${num} is ${result}`);

num = 111;
result = sumOfDigits(num);
console.log(`sum of digits ${num} is ${result}`);