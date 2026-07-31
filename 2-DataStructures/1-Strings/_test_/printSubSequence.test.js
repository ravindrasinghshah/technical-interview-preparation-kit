import { printSubSequence } from "../Problems/printSubSequence";

describe("printSubSequence", () => {
  it("logs non-empty subsequences", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printSubSequence("", "ab");
    const output = spy.mock.calls.map(([message]) => String(message)).join("\n");
    expect(output).toContain("a");
    expect(output).toContain("b");
    expect(output).toContain("ab");
  });
});
