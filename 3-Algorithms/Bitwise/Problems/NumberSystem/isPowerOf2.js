/**
 * cd to Bitwise/NumberSystem folder and then run "node isPowerOf2.js"
 */

function isPowerOf2(num) {
    return (num & (num-1)) === 0;
}

let n = 8;
let result = isPowerOf2(n);
console.log(`Is ${n} a power of 2? ${result}`);

n = 16;
result = isPowerOf2(n);
console.log(`Is ${n} a power of 2? ${result}`);

n = 22;
result = isPowerOf2(n);
console.log(`Is ${n} a power of 2? ${result}`);
