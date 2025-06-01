/**
 * cd to algos folder and then run "node midpoint.js"
 */
// find the midpoint of the linked list
import { LinkedList } from "../index.js";

function midpoint(list) {
    let slow = list.getFirst(), fast = list.getFirst();
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

const list = new LinkedList();
list.insertFirst(1); list.insertLast(2); list.insertLast(3); list.insertLast(4);list.insertLast(5);
const result = midpoint(list);
console.log("midpoint of given list:", result.value);