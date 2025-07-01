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
    isEmpty() { return this.head.data === -1; }
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
        if (this.tail.data === -1) this.tail.data = node.data;
        else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
    }
    delete(value) {
        let curr = this.head;
        while (curr) {
            if (curr.data === value) {
                if (curr.prev) {
                    curr.prev.next = curr.next;
                }
                else curr = curr.next;
                this.head = curr;
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
        console.log('---------------');
    }
}

const list = new DoublyLinkedList(2);
console.log("Is list empty? ", list.isEmpty());
list.insertFirst(new Node('a'));
list.add(new Node('b'));
list.add(new Node('c'));
list.add(new Node('d'));
list.add(new Node('e'));
list.print();
console.log('Does list contains "d"?', list.contains('d'));
console.log('Does list contains "f"?', list.contains('f'));
list.delete('a');
list.print();
list.insertFirst(new Node('z'));
list.print();

