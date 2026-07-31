import { findKthElement } from "../Problems/findKthElement";

it("returns the first matching index or -1", () => {
  expect(findKthElement([1, 2, 4, 2], 2)).toBe(1);
  expect(findKthElement([1, 2], 3)).toBe(-1);
});
