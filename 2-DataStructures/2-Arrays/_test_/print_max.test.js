import { print_max } from "../Problems/print_max";

describe("print_max", () => {
  it("logs the maximum, including negative values", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    print_max([-6, -7, -8]);
    expect(spy.mock.calls[0][0]).toContain("-6");
  });
});
