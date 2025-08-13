/**
 * cd to Recursion and run node reverseNumber.ts
 */
//== if we have to pass additional values then better create a new function
function reverseNumber(n: number) {
  let sum = 0;
  function reverse(n: number) {
    if (n % 10 === n && n / 10 === n) return;
    let remainder = n % 10;
    sum = sum * 10 + remainder;
    let reducedN = Math.floor(n / 10);
    reverse(reducedN);
  }
  reverse(n);
  return sum;
}

(() => {
  let num = 12345;
  let result = reverseNumber(num);
  console.log(`Reverse of digits ${num} is ${result}`);

  num = 123;
  result = reverseNumber(num);
  console.log(`Reverse of digits ${num} is ${result}`);

  num = 100;
  result = reverseNumber(num);
  console.log(`Reverse of digits ${num} is ${result}`);

  num = 102;
  result = reverseNumber(num);
  console.log(`Reverse of digits ${num} is ${result}`);
})();
