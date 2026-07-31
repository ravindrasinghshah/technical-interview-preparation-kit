import { reverse } from "../Problems/reverse";

describe("reverse", () => {
  it("reverses the supplied array in place", () => {
    const values = [1, 2, 3, 4];
    reverse(values);
    expect(values).toEqual([4, 3, 2, 1]);
  });
});
