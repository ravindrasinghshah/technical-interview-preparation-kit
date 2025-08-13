/**
 * cd to Maths folder and then run "npx ts-node isPrime.ts"
 */

function isPrime(num: number) {
  let i = 2;
  while (i * i <= num) {
    //== pattern - after square root number, it repeats the digits.
    if (num % i === 0) return false;
    i++;
  }
  return true;
}
(() => {
  let n = 2;
  let result = isPrime(n);
  console.log(`Is ${n} prime number? ${result}`);

  n = 4;
  result = isPrime(n);
  console.log(`Is ${n} prime number? ${result}`);

  n = 13;
  result = isPrime(n);
  console.log(`Is ${n} prime number? ${result}`);

  n = 36;
  result = isPrime(n);
  console.log(`Is ${n} prime number? ${result}`);

  n = 17;
  result = isPrime(n);
  console.log(`Is ${n} prime number? ${result}`);
})();
