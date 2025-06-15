/**
 * cd to DoublyLinkedList and run node index.js
 */

class Node {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor(size) {
        this.size = this.size;
        this.head = new Node(-1);
        this.tail = new Node(-1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    isEmpty() { return this.head === null; }
    add(node) {
        const h_next = this.head.next;
        h_next.prev = node;
        node.next = h_next;
        node.prev = this.head;
        this.head.next = node;
    }
}

const list = new DoublyLinkedList(2);
console.log("list head and next", list.head);
let node = new Node(1);
list.add(node);
console.log("list head and next", list.head);

node = new Node(2);
list.add(node);
console.log("list head and next", list.head);

node = new Node(3);
list.add(node);
console.log("list head and next", (list));
