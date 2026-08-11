import { describe, expect, it } from "vitest";
import { LinkedList } from "../Problems";
import reverseLinkedListII from "../Problems/reverse-linked-list-ii";

function createList(values) {
  const list = new LinkedList();
  values.forEach((value) => list.insertLast(value));
  return list;
}

function toArray(head) {
  const values = [];
  let current = head;

  while (current) {
    values.push(current.value);
    current = current.next;
  }

  return values;
}

describe("reverseLinkedListII", () => {
  it("reverses the nodes between the given positions", () => {
    const list = createList([1, 2, 3, 4, 5]);

    const head = reverseLinkedListII(list.head, 2, 4);

    expect(toArray(head)).toEqual([1, 4, 3, 2, 5]);
  });

  it("can reverse a range beginning at the head", () => {
    const list = createList([1, 2, 3, 4, 5]);

    const head = reverseLinkedListII(list.head, 1, 3);

    expect(toArray(head)).toEqual([3, 2, 1, 4, 5]);
  });

  it("leaves the list unchanged when left and right are equal", () => {
    const list = createList([1, 2, 3]);

    const head = reverseLinkedListII(list.head, 2, 2);

    expect(toArray(head)).toEqual([1, 2, 3]);
  });

  it("returns null for an empty list", () => {
    expect(reverseLinkedListII(null, 1, 1)).toBeNull();
  });
});
