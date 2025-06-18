/**
 * cd to Recursion and run node factorial_dp.js
 */
function factorial_dp(n) {
    function memo(n, m) {
        if (m.has(n)) return m.get(n);
        if (n === 1 || n === 0) { return 1; }
        let f = n * memo(n - 1, m);
        m.set(n, f);
        return f;
    }
    let m = new Map();
    return memo(n, m);
}
let num = 4;
let result = factorial_dp(num);
console.log(`factorial of ${num} is ${result}`);

num = 20;
result = factorial_dp(num);
console.log(`factorial of ${num} is ${result}`);