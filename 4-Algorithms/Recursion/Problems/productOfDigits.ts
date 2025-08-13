/**
 * cd to Recursion and run npx ts-node productOfDigits.ts
 */

function productOfDigits(n: number): number {
  if (n === 0) return 1;
  let remainder = n % 10;
  let reducedN = Math.floor(n / 10);
  return productOfDigits(reducedN) * remainder;
}

(() => {
  let num = 12345;
  let result = productOfDigits(num);
  console.log(`Product of digits ${num} is ${result}`);

  num = 123;
  result = productOfDigits(num);
  console.log(`Product of digits ${num} is ${result}`);

  num = 10;
  result = productOfDigits(num);
  console.log(`Product of digits ${num} is ${result}`);
})();
