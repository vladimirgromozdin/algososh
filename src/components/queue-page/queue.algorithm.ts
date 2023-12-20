export interface IQueue<T> {
    enqueue: (item: T) => IQueue<T>;
    dequeue: () => IQueue<T>;
    peek: () => T | null;
    getSize: () => number;
    head: number;
    tail: number;
}

export const createQueue = <T>(size: number = 7): IQueue<T> => {
    let container: (T | null)[] = Array(size).fill(null);
    let head = 0;
    let tail = -1;

    const enqueue = (item: T): IQueue<T> => {
        tail = (tail + 1) % container.length;
        container[tail] = item;
        return {...queue, tail};
    };

    const dequeue = (): IQueue<T> => {
        if (head === tail) {
            return queue;
        }
        container[head] = null;
        head = (head + 1) % container.length;
        return {...queue, head};
    };

    const peek = (): T | null => {
        if (head === tail) {
            return null;
        }
        return container[head];
    };

    const getSize = (): number => {
        return (tail >= head) ? tail - head + 1 : container.length - head + tail + 1;
    };

    const queue: IQueue<T> = {
        enqueue,
        dequeue,
        peek,
        getSize,
        get head() {
            return head;
        },
        get tail() {
            return tail;
        }
    };

    return queue;
};

