/**
 * run "npx ts-node 2-DataStructures\LinkedList\Problems\fromLast.ts"
 * Given a linked list and integer n, return the element n spaces from the last node in the list.
 * Do not call the 'size' method of the linked list
 * Assume that n will always be less than the length of the list.
 */
import { Log } from "../../../Log";
import { LinkedList } from "./index";

function fromLast(list: LinkedList, n: number) {
  let slow = list.getFirst();
  let fast = list.getAt(n); //== or while loop n times and decrement n while fast = fast.next;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow?.value;
}

(() => {
  const list = new LinkedList();
  list.insertLast("a");
  list.insertLast("b");
  list.insertLast("c");
  list.insertLast("d");

  const result = fromLast(list, 2);
  Log.info("From last: ", result);
})();
