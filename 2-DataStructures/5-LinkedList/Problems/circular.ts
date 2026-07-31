// check if the linked list is circular
import { LinkedList } from "./index";

export function circular(list: LinkedList): boolean {
  let slow = list.getFirst(),
    fast = list.getFirst();
  while (fast?.next && fast.next.next && slow) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
