import { cyclicSort } from "../Problems/cyclicSort";

it("places consecutive values at their matching indices", () => {
  expect(cyclicSort([3, 5, 2, 1, 4])).toEqual([1, 2, 3, 4, 5]);
});
