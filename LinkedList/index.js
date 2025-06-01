class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() { this.head = null; }
    size() {
        let counter = 0;
        let node = this.head;
        while (node) {
            counter++;
            node = node.next;
        }
        return counter;
    }
    clear() { this.head = null; }
    isEmpty() { return this.head === null; }
    insertFirst(data) { this.head = new Node(data, this.head); }
    getFirst() { return this.getAt(0); }
    getLast() { return this.getAt(this.size() - 1); }
    removeFirst() {
        if (this.isEmpty()) return;
        this.head = this.head.next;
    }
    removeLast() {
        if (this.isEmpty()) return;
        if (this.head.next === null) return;
        let previous = this.head;
        let nextNode = this.head.next;
        while (nextNode.next) {
            previous = nextNode;
            nextNode = nextNode.next;
        }
        previous.next = null;
    }
    insertLast(data) {
        let last = this.getLast();
        if (last) {
            last.next = new Node(data);
        } else {
            this.head = new Node(data);
        }
    }
    getAt(index) {
        let count = 0;
        let node = this.head;
        while (node) {
            if (count === index) { return node; }
            count++;
            node = node.next;
        }
        return null;
    }
    removeAt(index) {
        if (this.isEmpty()) return;
        if (index === 0) { this.head = this.head.next; return; }

        const prev = this.getAt(index - 1);
        if (!prev || !prev.next) return;
        prev.next = prev.next.next;
        return;
    }
    insertAt(data, index) {
        if (this.isEmpty()) { this.head = new Node(data); return; }
        if (index === 0) { this.insertFirst(data); return; }
        const prev = this.getAt(index - 1) || this.getLast();
        const node = new Node(data, prev.next);
        prev.next = node;
    }
}

// --- Test the LinkedList class ---
const list = new LinkedList();
console.log("list head:", list.head);
list.insertFirst(10);
console.log("list head and next", list.head, list.head.next);
list.insertFirst(20);
console.log("list head and next", list.head, list.head.next);
list.insertFirst(30);
console.log("list head and next", list.head, list.head.next);
console.log("Size of list:", list.size());
console.log("Get first value:", list.getFirst());
console.log("Get last value:", list.getLast());
// list.clear();
// console.log("After clear, list:", list.head);
list.removeFirst();
console.log("After remove first, list:", list.head);
list.removeLast();
console.log("After remove last, list:", list.head);
list.insertLast(4);
console.log("After insert last, list:", list.head);
list.insertLast(5);
list.removeAt(1); console.log("After remove at, list:", list.head);
list.insertAt(10, 99); console.log("After insert at, list:", list.head);