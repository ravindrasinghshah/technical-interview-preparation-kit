import { print_max_range } from "../Problems/print_max_range";

describe("print_max_range", () => {
  it("logs the maximum in the inclusive range", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    print_max_range([1, 9, 3, 4], 2, 3);
    expect(spy.mock.calls[0][0]).toContain("4");
  });
});
