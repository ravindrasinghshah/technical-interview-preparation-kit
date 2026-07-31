import { twoSum } from "../Problems/twoSum";

describe("twoSum", () => {
  it("returns matching indices or the no-match sentinel", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([1, 2, 3], 10)).toEqual([-1, -1]);
  });
});
