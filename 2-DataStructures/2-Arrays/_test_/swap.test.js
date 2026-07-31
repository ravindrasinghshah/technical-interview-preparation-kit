import { swap } from "../Problems/swap";

describe("swap", () => {
  it("swaps two array entries", () => {
    const values = [1, 2, 3];
    vi.spyOn(console, "log").mockImplementation(() => {});
    swap(values, 0, 2);
    expect(values).toEqual([3, 2, 1]);
  });
});
