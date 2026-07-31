// find the midpoint of the linked list
import { LinkedList } from "./index";

export function midpoint(list: LinkedList) {
  let slow = list.getFirst(),
    fast = list.getFirst();
  while (slow && fast?.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

