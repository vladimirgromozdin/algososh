import {Direction} from "../../types/direction";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const bubbleSorting = async (array: number[] | null, order: Direction, updateArray: (newArray: number[]) => void, delay: (ms: number) => Promise<void>, unlockButton: () => void, updateCandidateIndexes: (indexes: number[] | null) => void, updateSortedIndexes: (indexes: number) => void) => {
    if (array === null) {
        throw new Error("Array can't be empty");
    }
    if (order === Direction.Ascending) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                updateCandidateIndexes([j, j + 1])
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    updateArray([...array])
                    await delay(SHORT_DELAY_IN_MS)
                }
                updateCandidateIndexes([j, j + 1])
            }
            updateSortedIndexes(array.length - i - 1)
        }
        unlockButton();
    } else {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                updateCandidateIndexes([j, j + 1])
                if (array[j] < array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    updateArray([...array])
                    await delay(SHORT_DELAY_IN_MS)
                }
                updateCandidateIndexes([j, j + 1])
            }
            updateSortedIndexes(array.length - i - 1)
        }
    }
    unlockButton();
};

export const selectionSorting = async (array: number[] | null, order: Direction, updateArray: (newArray: number[]) => void, delay: (ms: number) => Promise<void>, unlockButton: () => void, updateCandidateIndexes: (indexes: number[] | null) => void, updateSortedIndexes: (indexes: number) => void) => {
    if (array === null) {
        throw new Error("Array can't be empty");
    }
    if (order === Direction.Ascending) {
        for (let i = 0; i < array.length; i++) {
            let min = i;
            for (let j = i + 1; j < array.length; j++) {
                updateCandidateIndexes([min, j]);
                if (array[j] < array[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                [array[i], array[min]] = [array[min], array[i]];
                updateArray([...array]);
                await delay(SHORT_DELAY_IN_MS);
            }
            updateSortedIndexes(i)
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            let max = i;
            for (let j = i + 1; j < array.length; j++) {
                updateCandidateIndexes([max, j]);
                if (array[j] > array[max]) {
                    max = j;
                }
            }
            if (max !== i) {
                [array[i], array[max]] = [array[max], array[i]];
                updateArray([...array]);
                await delay(SHORT_DELAY_IN_MS);
            }
            updateSortedIndexes(i)
        }
    }
    unlockButton()
}
