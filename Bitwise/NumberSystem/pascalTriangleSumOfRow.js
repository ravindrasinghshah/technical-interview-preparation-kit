/**
 * cd to Bitwise/NumberSystem folder and then run "node pascalTriangleSumOfRow.js"
 * https://en.wikipedia.org/wiki/Pascal%27s_triangle
 * The formula (1 << (n - 1)) is a bitwise trick to compute (2 ^ (n−1)), which is the sum of the nth row of Pascal’s Triangle (starting from row 1).
 */

function pascalTriangleSumOfRow(n) {
    return (1 << (n - 1));
}

let n = 2;
let result = pascalTriangleSumOfRow(n);
console.log(`Sum of ${n}th row in Pascal Triangle is ${result}`);

n = 5;
result = pascalTriangleSumOfRow(n);
console.log(`Sum of ${n}th row in Pascal Triangle is ${result}`);

n = 50;
result = pascalTriangleSumOfRow(n);
console.log(`Sum of ${n}th row in Pascal Triangle is ${result}`);
