import { isArraySorted } from "../Problems/isArraySorted";

it("identifies strictly ascending arrays", () => {
  expect(isArraySorted([])).toBe(true);
  expect(isArraySorted([1, 2, 3])).toBe(true);
  expect(isArraySorted([1, 3, 2])).toBe(false);
});
