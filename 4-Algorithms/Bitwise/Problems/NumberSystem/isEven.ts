/**
 * cd to Bitwise/NumberSystem folder and then run "npx ts-node isEven.ts"
 */

function isEven(num: number) {
  return (num & 1) === 0;
}

(() => {
  let n = 21;
  let result = isEven(n);
  console.log(`Is ${n} an even number? ${result}`);

  n = 22;
  result = isEven(n);
  console.log(`Is ${n} an even number? ${result}`);
})();
