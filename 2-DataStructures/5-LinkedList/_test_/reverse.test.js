import { reverse } from "../Problems/reverse";
import { LinkedList } from "../Problems";

describe("reverse linked list", () => {
  it("returns the reversed node chain", () => {
    const list = new LinkedList();
    [1, 2, 3].forEach((value) => list.insertLast(value));
    const head = reverse(list);
    expect([head?.value, head?.next?.value, head?.next?.next?.value]).toEqual([3, 2, 1]);
  });
});
