/**
 * cd to Recursion and run npx ts-node countdown.ts
 */

function countdown(n: number) {
  if (n === 0) {
    console.log(n);
    console.log("~~~ Hurray ~~~");
    return;
  }
  console.log(n);
  countdown(n - 1);
}

(() => {
  countdown(10);
})();
