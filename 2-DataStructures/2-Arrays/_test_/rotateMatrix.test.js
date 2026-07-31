import { rotateMatrix } from "../Problems/rotateMatrix";

describe("rotateMatrix", () => {
  it("rotates a square matrix clockwise in place", () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    vi.spyOn(console, "log").mockImplementation(() => {});
    rotateMatrix(matrix);
    expect(matrix).toEqual([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
  });
});
