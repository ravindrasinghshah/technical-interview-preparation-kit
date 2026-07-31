import { printPermutations } from "../Problems/printPermutations";

describe("printPermutations", () => {
  it("logs every permutation", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printPermutations("ab");
    expect(spy.mock.calls.filter(([message]) => String(message).includes("INFO:")).map(([message]) => String(message))).toHaveLength(2);
  });
});
