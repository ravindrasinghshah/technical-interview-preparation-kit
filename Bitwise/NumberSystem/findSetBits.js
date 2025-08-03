/**
 * cd to Bitwise/NumberSystem folder and then run "node findSetBits.js"
 * Find the set bits of binary number
 * Complexity log n
 */

function findSetBits(num) {
    let count = 0;
    while (num > 0) {
        count++;
        num = num & (num - 1);
    }
    return count;
}

let num = 4;
let result = findSetBits(num);
console.log(`Decimal number ${num} binary format is ${num.toString(2)} and set bits are ${result}`);

num = 40;
result = findSetBits(num);
console.log(`Decimal number ${num} binary format is ${num.toString(2)} and set bits are ${result}`);
