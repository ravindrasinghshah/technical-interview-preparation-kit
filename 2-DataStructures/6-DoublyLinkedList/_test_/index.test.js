import { DoublyLinkedList, ListNode } from "../Problems";

describe("DoublyLinkedList", () => {
  it("adds, finds, deletes, and reverses nodes", () => {
    const list = new DoublyLinkedList();
    list.insertFirst(new ListNode("a"));
    list.add(new ListNode("b"));
    list.add(new ListNode("c"));
    expect(list.contains("b")).toBe(true);
    list.delete("b");
    expect(list.contains("b")).toBe(false);
    list.reverse();
    expect(list.head?.data).toBe("c");
  });
});
