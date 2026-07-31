import { factorial } from "../Problems/factorial";

it("calculates factorials", () => {
  expect(factorial(0)).toBe(1);
  expect(factorial(5)).toBe(120);
});
