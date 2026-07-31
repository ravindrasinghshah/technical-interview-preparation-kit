import { factorial_dp } from "../Problems/factorial_dp";

it("calculates factorials with memoization", () => {
  expect(factorial_dp(6)).toBe(720);
});
