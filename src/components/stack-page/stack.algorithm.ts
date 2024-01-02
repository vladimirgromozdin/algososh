export interface IStack<T> {
    push: (item: T) => IStack<T>;
    pop: () => IStack<T>;
    peak: () => T | null;
    getSize: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push(item: T): Stack<T> {
        this.container.push(item);
        return this;
    }

    pop(): Stack<T> {
        if (this.container.length > 0) {
            this.container.pop();
        }
        return this;
    }

    peak(): T | null {
        if (this.container.length === 0) {
            return null;
        }
        return this.container[this.container.length - 1];
    }

    getSize(): number {
        return this.container.length;
    }
}
