import { countAndSay } from "../Problems/countAndSay";

describe("countAndSay", () => {
  it("returns terms in the sequence", () => {
    expect(countAndSay(1)).toBe("1");
    expect(countAndSay(4)).toBe("1211");
    expect(countAndSay(5)).toBe("111221");
  });
});
