/**
 * run npx ts-node 4-Algorithms\Maths\Problems\findFactors.ts
 */

function findFactors(n: number): number[] {
  let factors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

(() => {
  let num = 4;
  let result = findFactors(num);
  console.log(`Factors of ${num} are [${result}]`);

  num = 21;
  result = findFactors(num);
  console.log(`Factors of ${num} are [${result}]`);
})();
