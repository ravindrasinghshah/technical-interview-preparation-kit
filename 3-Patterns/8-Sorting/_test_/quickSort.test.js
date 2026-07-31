import { quickSort } from "../Problems/quickSort";

it("returns sorted values without changing the input", () => {
  const values = [2, 3, 5, 7, 0, 1];
  expect(quickSort(values)).toEqual([0, 1, 2, 3, 5, 7]);
  expect(values).toEqual([2, 3, 5, 7, 0, 1]);
});
