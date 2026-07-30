/**
 * run npx ts-node 2-DataStructures\DoublyLinkedList\Problems\index.ts
 */

import { Log } from "../../../Log";

class ListNode {
  data: string | number;
  prev: ListNode | null;
  next: ListNode | null;
  constructor(data: string | number, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  constructor() {
    this.head = new ListNode(-1);
    this.tail = new ListNode(-1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  isEmpty() {
    return this.head?.data === -1;
  }
  insertFirst(node: ListNode) {
    if (this.head?.data === -1) {
      this.head.data = node.data;
    } else {
      node.next = this.head;
      if (this.head && this.head.prev) {
        this.head.prev = node;
      }
      this.head = node;
    }
  }
  add(node: ListNode) {
    if (this.tail?.data === -1) this.tail.data = node.data;
    else {
      node.prev = this.tail;
      if (this.tail) {
        this.tail.next = node;
      }
      this.tail = node;
    }
  }
  delete(value: number | string) {
    let curr = this.head;
    while (curr) {
      if (curr.data === value) {
        if (curr.prev) {
          curr.prev.next = curr.next;
        } else curr = curr.next;
        this.head = curr;
        return;
      }
      curr = curr.next;
    }
  }
  reverse() {
    let curr = this.head;
    let prevNode = null;
    while (curr) {
      let nextNode = curr.next;
      curr.next = prevNode;
      prevNode = curr;
      curr = nextNode;
    }
    this.head = prevNode;
  }
  contains(value: number | string) {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      if (fast.data === value || slow?.data === value) return true;
      slow = slow && slow.next ? slow.next : null;
      fast = fast.next.next;
    }
    return false;
  }
  print() {
    let curr = this.head;
    while (curr) {
      Log.info(curr.data);
      curr = curr.next;
    }
    Log.info("---------------");
  }
}

(() => {
  const list = new DoublyLinkedList();
  Log.info("Is list empty? ", list.isEmpty());
  list.insertFirst(new ListNode("a"));
  list.add(new ListNode("b"));
  list.add(new ListNode("c"));
  list.add(new ListNode("d"));
  list.add(new ListNode("e"));
  list.print();
  Log.info('Does list contains "d"?', list.contains("d"));
  Log.info('Does list contains "f"?', list.contains("f"));
  list.delete("a");
  list.print();
  list.insertFirst(new ListNode("z"));
  list.print();
  Log.info("Reverse list:");
  list.reverse();
  list.print();
})();
