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

function findFactorsSqrt(n: number): number[] {
  let factors: number[] = [];
  let factors_desc: number[] = [];

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      if (n / i === i) {
        factors.push(i);
      } else {
        factors.push(i);
        factors_desc.push(n / i);
      }
    }
  }
  return [...factors, ...factors_desc.reverse()];
}

(() => {
  let num = 4;
  let result = findFactors(num);
  console.log(`Factors of ${num} are [${result}]`);

  num = 21;
  result = findFactorsSqrt(num);
  console.log(`Factors of ${num} are [${result}]`);

  num = 36;
  result = findFactorsSqrt(num);
  console.log(`Factors of ${num} are [${result}]`);
})();
