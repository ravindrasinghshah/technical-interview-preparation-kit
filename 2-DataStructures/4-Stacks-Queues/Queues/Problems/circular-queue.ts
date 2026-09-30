/**
 * Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO
 * (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".
 * One of the benefits of the circular queue is that we can make use of the spaces in front of the queue.
 * In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue.
 * But using the circular queue, we can use the space to store new values.
 */

class CircularQueue {
  private queue: number[];
  private head: number;
  private count: number;
  private capacity: number;

  constructor(k: number) {
    this.capacity = k;
    this.queue = new Array(this.capacity);
    this.head = 0;
    this.count = 0;
  }

  public Enqueue(val: number): boolean {
    if (this.IsFull()) return false;

    const tail = (this.head + this.count) % this.capacity;
    this.queue[tail] = val;
    this.count++;
    return true;
  }

  public Dequeue(): boolean {
    if (this.IsEmpty()) return false;

    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return true;
  }

  public Front(): number {
    if (this.IsEmpty()) return -1;
    return this.queue[this.head];
  }

  public Rear(): number {
    if (this.IsEmpty()) return -1;

    const tail = (this.head + this.count - 1) % this.capacity;
    return this.queue[tail];
  }

  public IsEmpty(): boolean {
    return this.count === 0;
  }

  public IsFull(): boolean {
    return this.count === this.capacity;
  }
}

export default CircularQueue;
