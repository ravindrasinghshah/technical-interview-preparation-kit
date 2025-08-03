/**
 * cd to Bitwise/Conversions folder and then run "node binaryToDecimal.js"
 * Convert binary number to decimal - Multiple and add power of base with digit in reverse order and increment power of base with every number.
 * Note: Number has limit of 2^53 - 1 (~16 digits) - for more length number use string.
 */

function binaryToDecimal(binary) {
    let decimal = 0; let n = 0;
    while (binary > 0) {
        const lastDigit = binary % 10;
        decimal += lastDigit * Math.pow(2, n);
        n++;
        binary = Math.floor(binary / 10);
    }
    return decimal;
}


let n = 10001;
let result = binaryToDecimal(n);
console.log(`Binary number ${n} in decimal is ${result}`);

n = 100;
result = binaryToDecimal(n);
console.log(`Binary number ${n} in decimal is ${result}`);

n = 1000100111100000;
result = binaryToDecimal(n);
console.log(`Binary number ${n} in decimal is ${result}`);