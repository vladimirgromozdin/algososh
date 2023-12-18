export interface IStack<T> {
    push: (item: T) => IStack<T>;
    pop: () => IStack<T>;
    peak: () => T | null;
    getSize: () => number;
}

export const createStack = <T>(): IStack<T> => {
    let container: T[] = [];

    const push = (item: T): IStack<T> => {
        container = [...container, item];
        return stack;
    };

    const pop = (): IStack<T> => {
        if (container.length === 0) {
            return stack;
        }
        container = container.slice(0, -1);
        return stack;
    };

    const peak = (): T | null => {
        if (container.length === 0) {
            return null;
        }
        return container[container.length - 1];
    };

    const getSize = (): number => container.length;

    const stack: IStack<T> = {
        push,
        pop,
        peak,
        getSize,
    };

    return stack;
};