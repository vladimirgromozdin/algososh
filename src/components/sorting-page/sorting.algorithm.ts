import {Direction} from "../../types/direction";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const bubbleSorting = async (array: number[] | null, order: Direction, updateArray: (newArray: number[]) => void, delay: (ms: number) => Promise<void>) => {
    if (array === null) {
        throw new Error("Array can't be empty");
    }

    if (order === Direction.Ascending) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    updateArray([...array])
                    await delay(SHORT_DELAY_IN_MS)
                }
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (array[j] < array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    updateArray([...array])
                    await delay(SHORT_DELAY_IN_MS)
                }
            }
        }
    }
};

export const selectionSorting = (array: number[] | null, order: Direction) => {
    if (array === null) {
        throw new Error("Array can't be empty");
    }
    if (order === Direction.Ascending) {
        for (let i = 0; i < array.length; i++) {
            let min = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                [array[i], array[min]] = [array[min], array[i]];
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            let max = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] > array[max]) {
                    max = j;
                }
            }
            if (max !== i) {
                [array[i], array[max]] = [array[max], array[i]];
            }
        }
    }
}
