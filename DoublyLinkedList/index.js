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
    insertFirst(node) {
        if (this.head.data === -1) {
            this.head.data = node.data;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }
    add(node) {
        const h_next = this.head.next;
        h_next.prev = node;
        node.next = h_next;
        node.prev = this.head;
        this.head.next = node;
    }
    delete(value) {
        let curr = this.head;
        while (curr) {
            if (curr.data === value) {
                if (curr.prev) {
                    curr.prev.next = curr.next;
                }
                else curr = curr.next;
                return;
            }
            curr = curr.next;
        }
    }
    contains(value) {
        let slow = this.head; let fast = this.head;
        while (fast && fast.next) {
            if (fast.data === value || slow.data === value) return true;
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
    print() {
        let curr = this.head;
        while (curr) {
            console.log(curr.data);
            curr = curr.next;
        }
    }
}

const list = new DoublyLinkedList(2);

list.insertFirst(new Node('a'));
list.insertFirst(new Node('b'));
list.insertFirst(new Node('c'));
list.insertFirst(new Node('d'));
list.insertFirst(new Node('e'));
list.print();
console.log('Does list contains "d"?', list.contains('d'));
console.log('Does list contains "f"?', list.contains('f'));
list.delete('a');
list.print();
