import {
    createLinkedList,
    linkedListToArray,
} from "../../test-helpers";
import oddEvenLinkedList from "../Problems/odd-even-linked-list";

describe("Linked List: Odd Even sorting", () => {
    it("Test case 1", () => {
        const list = createLinkedList([1, 2, 3, 4, 5]);
        const head = oddEvenLinkedList(list.head);

        expect(linkedListToArray(head)).toEqual([1, 3, 5, 2, 4]);
    });

    it("Test case 2", () => {
        const list = createLinkedList([2, 1, 3, 5, 6, 4, 7]);
        const head = oddEvenLinkedList(list.head);

        expect(linkedListToArray(head)).toEqual([2, 3, 6, 7, 1, 5, 4]);
    });

    it("Test case 3", () => {
        const list = createLinkedList([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        const head = oddEvenLinkedList(list.head);

        expect(linkedListToArray(head)).toEqual([11, 13, 15, 17, 19, 12, 14, 16, 18, 20]);
    });
});