/**
 * cd to Recursion and run npx ts-node 3-Patterns\5-Recursion\Problems\countZeros.ts
 */

export function countZeros_without_arg(n: number) {
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

export function countZeros(n: number, zeros = 0) {
  //== this passes the value to above calls;
  if (n === 0) return zeros;
  let remainder = n % 10;
  if (remainder === 0) {
    zeros++;
  }
  let remainingNumber = Math.floor(n / 10);
  return countZeros(remainingNumber, zeros);
}

