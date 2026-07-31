import { bubbleSort } from "../Problems/bubbleSort";

it("sorts values ascending in place", () => {
  const values = [2, 3, 5, 7, 0, 1];
  expect(bubbleSort(values)).toEqual([0, 1, 2, 3, 5, 7]);
});
