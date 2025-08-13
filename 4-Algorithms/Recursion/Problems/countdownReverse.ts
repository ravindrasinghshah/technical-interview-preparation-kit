/**
 * cd to Recursion and run npx ts-node countdownReverse.ts
 */

function countdownReverse(n: number) {
  if (n === 0) {
    return;
  }
  countdownReverse(n - 1);
  console.log(n);
}

(() => {
  countdownReverse(10);
})();
