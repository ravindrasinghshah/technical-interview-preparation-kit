import { LinkedList } from "../Problems";

describe("LinkedList", () => {
  it("supports core insertion, lookup, and removal operations", () => {
    const list = new LinkedList();
    list.insertFirst(2);
    list.insertFirst(1);
    list.insertLast(3);
    list.insertAt(4, 99);
    expect(list.size()).toBe(4);
    expect(list.getLast()?.value).toBe(4);
    list.removeAt(1);
    list.removeFirst();
    list.removeLast();
    expect(list.getFirst()?.value).toBe(3);
  });
});
