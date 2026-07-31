import { groupAnagrams } from "../Problems/groupAnagrams";

describe("groupAnagrams", () => {
  it("groups words that share the same letters", () => {
    expect(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).toEqual([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]);
  });
});
