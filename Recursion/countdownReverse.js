/**
 * cd to Recursion and run node countdownReverse.js
 */

function countdownReverse(n) {
    if (n === 0) { return; }
    countdownReverse(n - 1);
    console.log(n);
}

countdownReverse(10);