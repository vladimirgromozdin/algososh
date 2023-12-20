export interface ILinkedList<T> {
    append(element: T): void;

    prepend(element: T): void;

    insertAtIndex(element: T, index: number): void;

    deleteFromHead(): void;

    deleteFromTail(): void;

    deleteAtIndex(index: number): void;

    getSize(): number;

    print(): void;
}

export class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null = null;
    private size: number = 0;

    append(element: T) {
        const node = new Node(element);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    prepend(element: T) {
        const node = new Node(element, this.head);
        this.head = node;
        this.size++;
    }

    insertAtIndex(element: T, index: number): void {
        if (index < 0 || index > this.size) {
            throw new Error("Index out of bounds");
        }

        const node = new Node(element);
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current!.next;
            }
            node.next = current!.next;
            current!.next = node;
        }
        this.size++;
    }

    deleteAtIndex(index: number): void {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            this.head = this.head!.next;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current!.next;
            }
            current!.next = current!.next!.next;
        }
        this.size--;
    }

    deleteFromHead(): void {
        if (!this.head) {
            throw new Error("List is empty");
        }
        this.head = this.head.next;
        this.size--;
    }


    deleteFromTail(): void {
        if (!this.head) {
            throw new Error("List is empty");
        }
        if (!this.head.next) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next && current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    getSize(): number {
        return this.size;
    }

    clone(): LinkedList<T> {
        const newList = new LinkedList<T>();
        let current = this.head;
        while (current !== null) {
            newList.append(current.value);
            current = current.next;
        }
        return newList;
    }


    print(): string {
        let curr = this.head;
        let res = '';
        while (curr) {
            res += `${curr.value} -> `;
            curr = curr.next;
        }
        return res.trim();
    }

}