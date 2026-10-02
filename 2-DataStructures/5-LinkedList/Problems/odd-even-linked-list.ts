/**
 * Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
 * The first node is considered odd, and the second node is even, and so on.
 * Note that the relative order inside both the even and odd groups should remain as it was in the input.
 * https://leetcode.com/problems/odd-even-linked-list
 * example:
 * Input:  1 --> 2 --> 3 --> 4 --> 5
 * Output: 1 --> 3 --> 5 --> 2 --> 4
 */

import { Node as ListNode } from ".";

export default function oddEvenLinkedList(
  head: ListNode | null,
): ListNode | null {
  if (!head || !head.next) return head;

  let oddNode: ListNode | null = head;
  let evenNode: ListNode | null = head.next;
  let evenPointer = evenNode;

  while (evenNode && evenNode.next) {
    oddNode.next = evenNode.next;
    oddNode = oddNode.next;

    evenNode.next = oddNode.next;
    evenNode = evenNode.next;
  }

  oddNode.next = evenPointer;

  return head;
}
