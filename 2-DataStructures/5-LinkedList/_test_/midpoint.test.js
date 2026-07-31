import { midpoint } from "../Problems/midpoint";
import { LinkedList } from "../Problems";

describe("midpoint", () => {
  it("returns the middle node, favoring the first middle node", () => {
    const list = new LinkedList();
    [1, 2, 3, 4].forEach((value) => list.insertLast(value));
    expect(midpoint(list)?.value).toBe(2);
  });
});
