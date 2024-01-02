export interface IQueue<T> {
    enqueue: (item: T) => IQueue<T>;
    dequeue: () => IQueue<T>;
    peek: () => T | null;
    getSize: () => number;
    getHead: () => number;
    getTail: () => number
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[];
    private head: number;
    private tail: number;

    constructor(size: number = 7) {
        this.container = Array(size).fill(null);
        this.head = 0;
        this.tail = -1;
    }

    enqueue(item: T): Queue<T> {
        this.tail = (this.tail + 1) % this.container.length;
        this.container[this.tail] = item;
        return this;
    }

    dequeue(): Queue<T> {
        if (this.isEmpty()) {
            return this;
        }
        this.container[this.head] = null;
        this.head = (this.head + 1) % this.container.length;
        return this;
    }

    peek(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.container[this.head];
    }

    getSize(): number {
        return (this.tail >= this.head) ?
            (this.tail - this.head + 1) :
            (this.container.length - this.head + this.tail + 1);
    }

    public getHead(): number {
        return this.head;
    }

    public getTail(): number {
        return this.tail;
    }

    private isEmpty(): boolean {
        return this.getSize() === 0;
    }
}
