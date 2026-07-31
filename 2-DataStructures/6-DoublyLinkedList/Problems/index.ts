/**
 * run npx ts-node 2-DataStructures\DoublyLinkedList\Problems\index.ts
 */

import { Log } from "../../../Log";

export class ListNode {
  data: string | number;
  prev: ListNode | null;
  next: ListNode | null;
  constructor(data: string | number, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

export class DoublyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  isEmpty() {
    return this.head === null;
  }
  insertFirst(node: ListNode) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }
  add(node: ListNode) {
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }
  delete(value: number | string) {
    let curr = this.head;
    while (curr) {
      if (curr.data === value) {
        if (curr.prev) {
          curr.prev.next = curr.next;
        } else {
          this.head = curr.next;
        }
        if (curr.next) {
          curr.next.prev = curr.prev;
        } else {
          this.tail = curr.prev;
        }
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
    this.tail = null;
    let tail = this.head;
    while (tail?.next) tail = tail.next;
    this.tail = tail;
  }
  contains(value: number | string) {
    let curr = this.head;
    while (curr) {
      if (curr.data === value) return true;
      curr = curr.next;
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

