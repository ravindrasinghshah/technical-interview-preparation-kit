import CircularQueue from "../Problems/circular-queue";

describe("Circular Queue", () => {
    it("starts empty and rejects dequeue", () => {
        const queue = new CircularQueue(2);

        expect(queue.IsEmpty()).toBe(true);
        expect(queue.IsFull()).toBe(false);
        expect(queue.Front()).toBe(-1);
        expect(queue.Rear()).toBe(-1);
        expect(queue.Dequeue()).toBe(false);
    });

    it("enqueues up to capacity and rejects additional values", () => {
        const queue = new CircularQueue(2);

        expect(queue.Enqueue(10)).toBe(true);
        expect(queue.Enqueue(20)).toBe(true);
        expect(queue.IsFull()).toBe(true);
        expect(queue.Enqueue(30)).toBe(false);
        expect(queue.Front()).toBe(10);
        expect(queue.Rear()).toBe(20);
    });

    it("dequeues values in FIFO order", () => {
        const queue = new CircularQueue(3);
        queue.Enqueue(10);
        queue.Enqueue(20);
        queue.Enqueue(30);

        expect(queue.Dequeue()).toBe(true);
        expect(queue.Front()).toBe(20);
        expect(queue.Rear()).toBe(30);
        expect(queue.Dequeue()).toBe(true);
        expect(queue.Dequeue()).toBe(true);
        expect(queue.IsEmpty()).toBe(true);
        expect(queue.Front()).toBe(-1);
        expect(queue.Rear()).toBe(-1);
    });

    it("reuses freed slots after wrapping around", () => {
        const queue = new CircularQueue(3);
        queue.Enqueue(10);
        queue.Enqueue(20);
        queue.Enqueue(30);
        queue.Dequeue();
        queue.Dequeue();

        expect(queue.Enqueue(40)).toBe(true);
        expect(queue.Enqueue(50)).toBe(true);
        expect(queue.IsFull()).toBe(true);
        expect(queue.Front()).toBe(30);
        expect(queue.Rear()).toBe(50);
        expect(queue.Dequeue()).toBe(true);
        expect(queue.Front()).toBe(40);
    });
});