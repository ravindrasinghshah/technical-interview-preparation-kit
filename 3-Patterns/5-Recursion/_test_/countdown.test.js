import { countdown } from "../Problems/countdown";

it("returns a descending countdown", () => {
  expect(countdown(3)).toEqual([3, 2, 1, 0]);
});
