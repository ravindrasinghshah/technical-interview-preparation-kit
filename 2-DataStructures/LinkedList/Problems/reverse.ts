/**
 * run "npx ts-node 2-DataStructures\LinkedList\Problems\reverse.ts"
 * Given a linked list, return reversed list.
 */
import { Log } from "../../../Log";
import { LinkedList } from "./index";
function reverse(list: LinkedList) {
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

(() => {
  const list = new LinkedList();
  list.insertLast("1");
  list.insertLast("2");
  list.insertLast("3");
  list.insertLast("4");

  const result = reverse(list);
  Log.info("Reversed: ", JSON.stringify(result));
})();
