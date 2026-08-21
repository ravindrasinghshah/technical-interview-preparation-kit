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


import { Node } from "./8-BinarySearchTree/Problems";

export function createBinaryTree(values) {
  if (values.length === 0 || values[0] == null) return null;

  const root = new Node(values[0]);
  const parents = [root];
  let valueIndex = 1;

  while (parents.length > 0 && valueIndex < values.length) {
    const parent = parents.shift();
    const leftValue = values[valueIndex++];

    if (leftValue != null) {
      parent.left = new Node(leftValue);
      parents.push(parent.left);
    }

    if (valueIndex >= values.length) break;

    const rightValue = values[valueIndex++];
    if (rightValue != null) {
      parent.right = new Node(rightValue);
      parents.push(parent.right);
    }
  }

  return root;
}

export function binaryTreeToArray(root) {
  if (!root) return [];

  const values = [];
  const nodes = [root];
  let nodeIndex = 0;

  while (nodeIndex < nodes.length) {
    const node = nodes[nodeIndex++];

    if (!node) {
      values.push(null);
      continue;
    }

    values.push(node.data);
    nodes.push(node.left, node.right);
  }

  while (values.at(-1) === null) values.pop();

  return values;
}
