import { fromLast } from "../Problems/fromLast";
import { LinkedList } from "../Problems";

describe("fromLast", () => {
  it("returns the node value n positions from the end", () => {
    const list = new LinkedList();
    ["a", "b", "c", "d"].forEach((value) => list.insertLast(value));
    expect(fromLast(list, 2)).toBe("b");
  });
});
