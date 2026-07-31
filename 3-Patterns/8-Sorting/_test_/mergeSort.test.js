import { merge, mergeSort } from "../Problems/mergeSort";

it("merges and sorts values ascending", () => {
  expect(merge([1, 4], [2, 3])).toEqual([1, 2, 3, 4]);
  expect(mergeSort([100, -40, 500, -124, 0])).toEqual([-124, -40, 0, 100, 500]);
  expect(mergeSort([])).toEqual([]);
});
