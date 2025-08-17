/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\isPowerOf2.ts"
 */

function isPowerOf2(num: number) {
  return (num & (num - 1)) === 0;
}
(() => {
  let n = 8;
  let result = isPowerOf2(n);
  console.log(`Is ${n} a power of 2? ${result}`);

  n = 16;
  result = isPowerOf2(n);
  console.log(`Is ${n} a power of 2? ${result}`);

  n = 22;
  result = isPowerOf2(n);
  console.log(`Is ${n} a power of 2? ${result}`);
})();
