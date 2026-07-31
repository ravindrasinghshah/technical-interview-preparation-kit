import { reverseNumber } from "../Problems/reverseNumber";

it("reverses digits while dropping leading zeroes", () => {
  expect(reverseNumber(12345)).toBe(54321);
  expect(reverseNumber(100)).toBe(1);
});
