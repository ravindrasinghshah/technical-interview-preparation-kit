/**
 * cd to Recursion and run node countZeros.js
 */

function countZeros_without_arg(n) {
    let zeros = 0;
    function rec(n) {
        if (n === 0) return;
        let remainder = n % 10;
        if (remainder === 0) zeros++;
        let remainingNumber = Math.floor(n / 10);
        rec(remainingNumber);
    }
    rec(n);
    return zeros;
}

function countZeros(n, zeros = 0) {
    //== this passes the value to above calls;
    if (n === 0) return zeros;
    let remainder = n % 10;
    if (remainder === 0) { zeros++; }
    let remainingNumber = Math.floor(n / 10);
    return countZeros(remainingNumber, zeros);
}

let num = 12321;
let result = countZeros(num);
console.log(`Total zeros in ${num} is ${result}`);

num = 100001;
result = countZeros(num);
console.log(`Total zeros in ${num} is ${result}`);
