/**
 * cd to Recursion and run node countdown.js
 */

function countdown(n) {
    if (n === 0) {
        console.log(n);
        console.log("~~~ Hurray ~~~");
        return;
    }
    console.log(n);
    countdown(n - 1);
}

countdown(10);