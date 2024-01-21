import { DELAY_IN_MS } from "../../constants/delays";

export const reverseString = (
  stringToReverse: string[],
  left: number,
  right: number,
  unlockButton: () => void,
  updateCandidateIndexes: (left: number | null, right: number | null) => void,
  updateReversedIndexes: (
    left: number | null,
    right: number | null,
    middleIndex?: number,
  ) => void,
  renderChanges?: (newArray: string[]) => void,
) => {
  if (left >= right) {
    const middleIndex = Math.floor((left + right) / 2);
    updateReversedIndexes(null, null, middleIndex);
    updateCandidateIndexes(null, null);
    unlockButton();
    return stringToReverse;
  }
  updateCandidateIndexes(left + 1, right - 1);
  [stringToReverse[left], stringToReverse[right]] = [
    stringToReverse[right],
    stringToReverse[left],
  ];
  updateReversedIndexes(left, right);
  left++;
  right--;
  if (renderChanges) {
    renderChanges([...stringToReverse]);
  }
  setTimeout(() => {
    reverseString(
      stringToReverse,
      left,
      right,
      unlockButton,
      updateCandidateIndexes,
      updateReversedIndexes,
      renderChanges,
    );
  }, DELAY_IN_MS);
};
