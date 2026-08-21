import { describe, expect, it } from "vitest";
import {
  createLinkedList,
  linkedListToArray,
} from "../../test-helpers";
import reverseLinkedListII from "../Problems/reverse-linked-list-ii";

describe("reverseLinkedListII", () => {
  it("reverses the nodes between the given positions", () => {
    const list = createLinkedList([1, 2, 3, 4, 5]);

    const head = reverseLinkedListII(list.head, 2, 4);

    expect(linkedListToArray(head)).toEqual([1, 4, 3, 2, 5]);
  });

  it("can reverse a range beginning at the head", () => {
    const list = createLinkedList([1, 2, 3, 4, 5]);

    const head = reverseLinkedListII(list.head, 1, 3);

    expect(linkedListToArray(head)).toEqual([3, 2, 1, 4, 5]);
  });

  it("leaves the list unchanged when left and right are equal", () => {
    const list = createLinkedList([1, 2, 3]);

    const head = reverseLinkedListII(list.head, 2, 2);

    expect(linkedListToArray(head)).toEqual([1, 2, 3]);
  });

  it("returns null for an empty list", () => {
    expect(reverseLinkedListII(null, 1, 1)).toBeNull();
  });
});
