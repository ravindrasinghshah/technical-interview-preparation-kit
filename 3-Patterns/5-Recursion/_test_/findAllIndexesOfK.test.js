import { findAllIndexesOfK } from "../Problems/findAllIndexesOfK";

it("returns every matching index", () => {
  expect(findAllIndexesOfK([1, 2, 1, 3, 1], 1)).toEqual([0, 2, 4]);
});
