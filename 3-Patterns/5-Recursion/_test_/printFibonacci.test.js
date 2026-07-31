import { print_fibonacci } from "../Problems/printFibonacci";

it("returns a testable Fibonacci iterable", () => {
  expect([...print_fibonacci(7)]).toEqual([0, 1, 1, 2, 3, 5, 8]);
});
