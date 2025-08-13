class Node {
  value: string | number;
  next: Node | null;
  constructor(value: string | number, next: Node | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  head: Node | null;
  constructor() {
    this.head = null;
  }
  size() {
    let counter = 0;
    let node = this.head;
    while (node) {
      counter++;
      node = node.next;
    }
    return counter;
  }
  clear() {
    this.head = null;
  }
  isEmpty() {
    return this.head === null;
  }
  insertFirst(data: number | string) {
    this.head = new Node(data, this.head);
  }
  getFirst() {
    return this.getAt(0);
  }
  getLast() {
    return this.getAt(this.size() - 1);
  }
  removeFirst() {
    if (this.isEmpty()) return;
    if (this.head) this.head = this.head.next;
  }
  removeLast() {
    if (this.isEmpty()) return;
    if (this.head?.next === null) return;
    let previous = this.head;
    if (this.head?.next) {
      let nextNode = this.head.next;
      while (nextNode.next) {
        previous = nextNode;
        nextNode = nextNode.next;
      }
    }
    if (previous) previous.next = null;
  }
  insertLast(data: string | number) {
    let last = this.getLast();
    if (last) {
      last.next = new Node(data);
    } else {
      this.head = new Node(data);
    }
  }
  getAt(index: number) {
    let count = 0;
    let node = this.head;
    while (node) {
      if (count === index) {
        return node;
      }
      count++;
      node = node.next;
    }
    return null;
  }
  removeAt(index: number) {
    if (this.isEmpty()) return;
    if (index === 0 && this.head) {
      this.head = this.head.next;
      return;
    }

    const prev = this.getAt(index - 1);
    if (!prev || !prev.next) return;
    prev.next = prev.next.next;
    return;
  }
  insertAt(data: number | string, index: number) {
    if (this.isEmpty()) {
      this.head = new Node(data);
      return;
    }
    if (index === 0) {
      this.insertFirst(data);
      return;
    }
    const prev = this.getAt(index - 1) || this.getLast();
    const node = new Node(data, prev?.next);
    if (prev) prev.next = node;
  }
}

// --- Test the LinkedList class ---
// const list = new LinkedList();
// console.log("list head:", list.head);
// list.insertFirst(10);
// console.log("list head and next", list.head, list.head.next);
// list.insertFirst(20);
// console.log("list head and next", list.head, list.head.next);
// list.insertFirst(30);
// console.log("list head and next", list.head, list.head.next);
// console.log("Size of list:", list.size());
// console.log("Get first value:", list.getFirst());
// console.log("Get last value:", list.getLast());
// // list.clear();
// // console.log("After clear, list:", list.head);
// list.removeFirst();
// console.log("After remove first, list:", list.head);
// list.removeLast();
// console.log("After remove last, list:", list.head);
// list.insertLast(4);
// console.log("After insert last, list:", list.head);
// list.insertLast(5);
// list.removeAt(1); console.log("After remove at, list:", list.head);
// list.insertAt(10, 99); console.log("After insert at, list:", list.head);

export { Node, LinkedList };
