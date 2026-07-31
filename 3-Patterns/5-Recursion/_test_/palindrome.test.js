import { palindrome } from "../Problems/palindrome";

it("recognizes numeric palindromes", () => {
  expect(palindrome(12321)).toBe(true);
  expect(palindrome(12345)).toBe(false);
});
