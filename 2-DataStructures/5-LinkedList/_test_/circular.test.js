import { circular } from "../Problems/circular";
import { LinkedList, Node } from "../Problems";

describe("circular", () => {
  it("detects a cycle", () => {
    const list = new LinkedList();
    const first = new Node("a");
    const second = new Node("b");
    list.head = first;
    first.next = second;
    second.next = first;
    expect(circular(list)).toBe(true);
  });

  it("returns false for a linear list", () => {
    const list = new LinkedList();
    list.insertLast("a");
    expect(circular(list)).toBe(false);
  });
});
