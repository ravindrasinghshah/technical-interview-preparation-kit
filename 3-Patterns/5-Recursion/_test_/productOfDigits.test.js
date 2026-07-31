import { productOfDigits } from "../Problems/productOfDigits";

it("multiplies digits", () => {
  expect(productOfDigits(1234)).toBe(24);
  expect(productOfDigits(10)).toBe(0);
});
