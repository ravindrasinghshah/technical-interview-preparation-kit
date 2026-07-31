import { print_cols } from "../Problems/print_cols";

describe("print_cols", () => {
  it("logs every column", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    print_cols([[1, 2], [3, 4]]);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0].join(" ")).toContain("1,3");
  });
});
