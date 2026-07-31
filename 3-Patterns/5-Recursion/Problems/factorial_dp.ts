/**
 * run npx ts-node 3-Patterns\5-Recursion\Problems\factorial_dp.ts
 */
export function factorial_dp(n: number) {
  function memo(n: number, m: Map<number, number>): number {
    if (m.has(n)) {
      return m.get(n)!;
    }
    if (n === 1 || n === 0) {
      return 1;
    }
    let f = n * memo(n - 1, m);
    m.set(n, f);
    return f;
  }
  let m: Map<number, number> = new Map();
  return memo(n, m);
}

