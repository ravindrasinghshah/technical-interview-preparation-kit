import { find_fibonacci } from "../Problems/findFibonacci";

it("returns Fibonacci values", () => {
  expect(find_fibonacci(0)).toBe(0);
  expect(find_fibonacci(6)).toBe(8);
});
