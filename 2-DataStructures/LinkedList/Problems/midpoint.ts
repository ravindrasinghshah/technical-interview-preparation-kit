/**
 * run "npx ts-node 2-DataStructures\LinkedList\Problems\midpoint.ts"
 */
// find the midpoint of the linked list
import { Log } from "../../../Log";
import { LinkedList } from "./index";

function midpoint(list: LinkedList) {
  let slow = list.getFirst(),
    fast = list.getFirst();
  while (slow && fast?.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

(() => {
  const list = new LinkedList();
  list.insertFirst(1);
  list.insertLast(2);
  list.insertLast(3);
  list.insertLast(4);
  list.insertLast(5);
  const result = midpoint(list);
  Log.info("midpoint of given list:", result?.value);
})();
