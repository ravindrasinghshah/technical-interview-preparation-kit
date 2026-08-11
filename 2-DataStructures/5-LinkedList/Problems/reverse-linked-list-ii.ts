import { Node } from ".";

/**
 * https://leetcode.com/problems/reverse-linked-list-ii/description/
 * Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
 */
export default function reverse_linked_list_ii(
  head: Node | null,
  left: number,
  right: number,
): Node | null {
  if (!head || left === right) return head;

  const dummy = new Node(0, head);
  let prev: Node = dummy;

  // iterate till node is reached before left index
  for (let i = 1; i < left; i++) prev = prev.next!;

  let curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    let move = curr?.next;
    curr!.next = move?.next!;
    move!.next = prev.next;
    prev!.next = move!;
  }

  return dummy.next;
}
