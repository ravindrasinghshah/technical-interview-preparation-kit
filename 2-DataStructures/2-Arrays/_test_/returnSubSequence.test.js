import { returnSubSequence } from "../Problems/returnSubSequence";

describe("returnSubSequence", () => {
  it("returns all non-empty subsequences", () => {
    expect(returnSubSequence("ab")).toEqual(["ab", "a", "b"]);
    expect(returnSubSequence("")).toEqual([]);
  });
});
