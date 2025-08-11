/**
 * cd to Recursion and run node printFibonacci.js
 * fib: 0, 1, 1, 2, 3, 5, 8, 13....
 * Generator functions concept used to print the fib series
 */

function* print_fibonacci(n) {
    let [a, b] = [0, 1];
    while (n > 0) {
        n--;
        yield a;
        [a, b] = [b, a + b];
    }
}
let num = 4;
let generator = print_fibonacci(num);
let result = [];
for (let value of generator) { result.push(value); }
console.log(`fibonacci of ${num} is ${result}`);

// num = 6;
// result = print_fibonacci(num);
// console.log(`fibonacci of ${num} is ${result}`);