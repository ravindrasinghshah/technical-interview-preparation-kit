/**
 * Given a linked list, return reversed list.
 */
import { LinkedList } from "./index";
export function reverse(list: LinkedList) {
  let reverseList = null;
  let curr = list.getFirst();
  while (curr) {
    let nextNode = curr.next; //== first assing current node's next node in variable (so that it's not lost)
    curr.next = reverseList; //== break the current node chain by assigning reverseList as next chain
    reverseList = curr; //== add current node to the reverseList
    curr = nextNode; //== now nextNode is current node to work on
  }
  return reverseList;
}
