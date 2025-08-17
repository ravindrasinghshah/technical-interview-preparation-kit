/**
 * run "npx ts-node 5-Exercises\fizzBuzz.ts"
  Write a program that console logs the numbers from 1 to n.
  For multiples of three print 'fizz' instead of the number 
  For the multiples of five print 'buzz'
  For numbers which are multiples of both three and five print 'fizzbuzz'
   Examples: fizzBuzz(5);
    // Output from console.log:
    // 1
    // 2
    // fizz
    // 4
    // buzz
 */

function fizzBuzz(n: number) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    const isDivisibleBy3 = i % 3 === 0;
    const isDivisibleBy5 = i % 5 === 0;
    if (isDivisibleBy3 && isDivisibleBy5) {
      arr.push("fizzbuzz");
    } else if (isDivisibleBy3) {
      arr.push("fizz");
    } else if (isDivisibleBy5) {
      arr.push("buzz");
    } else {
      arr.push(i.toString());
    }
  }
  return arr.join(" ");
}

(() => {
  let n = 5;
  let result = fizzBuzz(n);
  console.log(`${n} : ${result}`);

  n = 18;
  result = fizzBuzz(n);
  console.log(`${n} : ${result}`);
})();
