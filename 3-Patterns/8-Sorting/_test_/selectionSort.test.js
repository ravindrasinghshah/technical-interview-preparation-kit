import { selectionSort } from "../Problems/selectionSort";

it("sorts values ascending in place", () => {
  expect(selectionSort([100, -40, 500, -124, 0])).toEqual([-124, -40, 0, 100, 500]);
});
