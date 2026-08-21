import { LinkedList } from "./5-LinkedList/Problems";

export function createLinkedList(values) {
  const list = new LinkedList();
  values.forEach((value) => list.insertLast(value));
  return list;
}

export function linkedListToArray(head) {
  const values = [];
  let current = head;

  while (current) {
    values.push(current.value);
    current = current.next;
  }

  return values;
}
