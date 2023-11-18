import {DELAY_IN_MS} from "../../constants/delays";

export const reverseString = (stringToReverse: string[], left: number, right: number, unlockButton: () => void, updateCandidateIndexes: (left: number | null, right: number | null) => void, renderChanges?: (newArray: string[]) => void) => {
    if (left >= right) {
        updateCandidateIndexes(null, null)
        unlockButton();
        return stringToReverse
    }
    updateCandidateIndexes(left + 1, right - 1);
    [stringToReverse[left], stringToReverse[right]] = [stringToReverse[right], stringToReverse[left]];
    left++
    right--
    if (renderChanges) {
        renderChanges([...stringToReverse]);
    }
    setTimeout(() => {
        reverseString(stringToReverse, left, right, unlockButton, updateCandidateIndexes, renderChanges)
    }, DELAY_IN_MS)
}