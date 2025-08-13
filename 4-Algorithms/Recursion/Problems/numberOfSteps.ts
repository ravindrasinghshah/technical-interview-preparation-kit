/**
 * cd to Recursion and run npx ts-node numberOfSteps.ts
 */

function numberOfSteps_s(n: number, steps: number = 0) {
  if (n === 0) {
    return steps;
  }
  if (n % 2 === 0) return numberOfSteps_s(n / 2, ++steps);
  else return numberOfSteps_s(n - 1, ++steps);
}

function numberOfSteps(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n % 2 === 0) return 1 + numberOfSteps(n / 2);
  else return 1 + numberOfSteps(n - 1);
}

(() => {
  let num = 5;
  let result = numberOfSteps(num);
  console.log(`Total zeros in ${num} is ${result}`);

  num = 10;
  result = numberOfSteps(num);
  console.log(`Total zeros in ${num} is ${result}`);
})();
