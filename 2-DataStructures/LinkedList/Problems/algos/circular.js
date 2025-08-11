/**
 * cd to algos folder and then run "node circular.js"
 */
// check if the linked list is circular
import { LinkedList, Node } from "../index.js";
function circular(list) {
    let slow = list.getFirst(), fast = list.getFirst();
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

const list = new LinkedList();
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');

list.head = a;
a.next = b;
b.next = c;
c.next = b;

const result = circular(list);
console.log("Given list is circular: ", result);