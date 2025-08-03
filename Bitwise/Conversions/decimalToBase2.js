/**
 * cd to Bitwise/Conversions folder and then run "node decimalToBase2.js"
 * Convert decimal number to base 2 number
 */

function decimalToBase2(num) {
    let base2 = '';
    while (num >= 1) {
        base2 = (num % 2).toString() + base2;
        num = Math.floor(num / 2);
    }
    return base2;
}

function decimalToBase2_recursion(num, remainder = '') {
    if (num === 1) return 1 + b;

    remainder = num % 2 + remainder; //== add latest remainder before
    num = Math.floor(num / 2);
    return decimalToBase2(num, remainder);
}

let n = 2;
let result = decimalToBase2(n);
console.log(`Number ${n} in base 2 is ${result}`);

n = 16;
result = decimalToBase2(n);
console.log(`Number ${n} in base 2 is ${result}`);
n = 17;
result = decimalToBase2(n);
console.log(`Number ${n} in base 2 is ${result}`);
n = 18;
result = decimalToBase2(n);
console.log(`Number ${n} in base 2 is ${result}`);