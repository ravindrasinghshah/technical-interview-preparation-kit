import { countZeros, countZeros_without_arg } from "../Problems/countZeros";

it("counts zero digits with both implementations", () => {
  expect(countZeros(100001)).toBe(4);
  expect(countZeros_without_arg(100001)).toBe(4);
});
