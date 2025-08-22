/**
 * run npx ts-node 4-Algorithms\Maths\Problems\findLCM.ts
 * Least Common Multiple, is the smallest positive integer that is a multiple of two or more given numbers.
 * LCM of two integers, 'a' and 'b', can be determined using their greatest common divisor (GCD) through a specific formula.
 * This relationship is based on the property that the product of two numbers is equal to the product of their LCM and GCD.
 */

function gcd(num1: number, num2: number) {
  if (num2 == 0) return num1; //= base case
  return gcd(num2, num1 % num2);
}

function findLCM(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

(() => {
  let a = 4,
    b = 16;
  let result = findLCM(a, b);
  console.log(`LCM of ${a} and ${b} is ${result}`);

  (a = 2), (b = 7);
  result = findLCM(a, b);
  console.log(`LCM of ${a} and ${b} is ${result}`);

  (a = 5), (b = 10);
  result = findLCM(a, b);
  console.log(`LCM of ${a} and ${b} is ${result}`);
})();
