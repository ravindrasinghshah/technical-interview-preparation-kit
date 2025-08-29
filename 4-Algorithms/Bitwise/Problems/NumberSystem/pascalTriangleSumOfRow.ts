/**
 * run "npx ts-node 4-Algorithms\Bitwise\Problems\NumberSystem\pascalTriangleSumOfRow.ts"
 * https://en.wikipedia.org/wiki/Pascal%27s_triangle
 * The formula (1 << (n - 1)) is a bitwise trick to compute (2 ^ (n−1)), which is the sum of the nth row of Pascal’s Triangle (starting from row 1).
 */

import { Log } from "../../../../Log";

function pascalTriangleSumOfRow(n: number) {
  return 1 << (n - 1);
}

(() => {
  let n = 2;
  let result = pascalTriangleSumOfRow(n);
  Log.info(`Sum of ${n}th row in Pascal Triangle is ${result}`);

  n = 5;
  result = pascalTriangleSumOfRow(n);
  Log.info(`Sum of ${n}th row in Pascal Triangle is ${result}`);

  n = 50;
  result = pascalTriangleSumOfRow(n);
  Log.info(`Sum of ${n}th row in Pascal Triangle is ${result}`);
})();
