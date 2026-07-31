import { countdownReverse } from "../Problems/countdownReverse";

it("returns an ascending countdown", () => {
  expect(countdownReverse(3)).toEqual([1, 2, 3]);
});
