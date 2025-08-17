/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\isEven.ts"
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
