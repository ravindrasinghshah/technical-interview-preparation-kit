import { lengthOfLongestSubstring } from "../Problems/lengthOfLongestSubstring";

describe("lengthOfLongestSubstring", () => {
  it("finds the longest unique contiguous substring", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
    expect(lengthOfLongestSubstring("")).toBe(0);
  });
});
