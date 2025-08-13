/**
 * cd to Recursion and run npx ts-node countZeros.ts
 */

function countZeros_without_arg(n: number) {
  let zeros = 0;
  function rec(n: number) {
    if (n === 0) return;
    let remainder = n % 10;
    if (remainder === 0) zeros++;
    let remainingNumber = Math.floor(n / 10);
    rec(remainingNumber);
  }
  rec(n);
  return zeros;
}

function countZeros(n: number, zeros = 0) {
  //== this passes the value to above calls;
  if (n === 0) return zeros;
  let remainder = n % 10;
  if (remainder === 0) {
    zeros++;
  }
  let remainingNumber = Math.floor(n / 10);
  return countZeros(remainingNumber, zeros);
}

(() => {
  let num = 12321;
  let result = countZeros(num);
  console.log(`Total zeros in ${num} is ${result}`);

  num = 100001;
  result = countZeros(num);
  console.log(`Total zeros in ${num} is ${result}`);
})();
