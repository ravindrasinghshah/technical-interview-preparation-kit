/**
 * cd to Recursion and run npx ts-node factorial.ts
 */

function factorial(n: number): number {
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

(() => {
  let num = 4;
  let result = factorial(num);
  console.log(`factorial of ${num} is ${result}`);
})();
