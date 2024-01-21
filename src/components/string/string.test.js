import { reverseString } from "./string.algorithm";
import { DELAY_IN_MS } from "../../constants/delays";

describe("Reverse String Component", () => {
  it("should correctly revert string with even number of characters", async () => {
    const stringToReverse = ["T", "E", "S", "T"];
    const mockUnlockButton = jest.fn();
    const mockUpdateCandidateIndexes = jest.fn();
    const mockRenderChanges = jest.fn();

    await new Promise((resolve) => {
      reverseString(
        stringToReverse,
        0,
        stringToReverse.length - 1,
        mockUnlockButton,
        mockUpdateCandidateIndexes,
        mockRenderChanges,
      );
      setTimeout(resolve, DELAY_IN_MS * stringToReverse.length);
    });

    expect(stringToReverse.join("")).toEqual("TSET");
    expect(mockUnlockButton).toHaveBeenCalled();
  });

  it("should correctly revert string with odd number of characters", async () => {
    const stringToReverse = ["T", "E", "S"];
    const mockUnlockButton = jest.fn();
    const mockUpdateCandidateIndexes = jest.fn();
    const mockRenderChanges = jest.fn();

    await new Promise((resolve) => {
      reverseString(
        stringToReverse,
        0,
        stringToReverse.length - 1,
        mockUnlockButton,
        mockUpdateCandidateIndexes,
        mockRenderChanges,
      );
      setTimeout(resolve, DELAY_IN_MS * stringToReverse.length);
    });

    expect(stringToReverse.join("")).toEqual("SET");
    expect(mockUnlockButton).toHaveBeenCalled();
  });
  it("should correctly revert string with one number of characters", async () => {
    const stringToReverse = ["S"];
    const mockUnlockButton = jest.fn();
    const mockUpdateCandidateIndexes = jest.fn();
    const mockRenderChanges = jest.fn();

    await new Promise((resolve) => {
      reverseString(
        stringToReverse,
        0,
        stringToReverse.length - 1,
        mockUnlockButton,
        mockUpdateCandidateIndexes,
        mockRenderChanges,
      );
      setTimeout(resolve, DELAY_IN_MS * stringToReverse.length);
    });

    expect(stringToReverse.join("")).toEqual("S");
    expect(mockUnlockButton).toHaveBeenCalled();
  });
  it("should correctly revert string with no numbers of characters", async () => {
    const stringToReverse = [""];
    const mockUnlockButton = jest.fn();
    const mockUpdateCandidateIndexes = jest.fn();
    const mockRenderChanges = jest.fn();

    await new Promise((resolve) => {
      reverseString(
        stringToReverse,
        0,
        stringToReverse.length - 1,
        mockUnlockButton,
        mockUpdateCandidateIndexes,
        mockRenderChanges,
      );
      setTimeout(resolve, DELAY_IN_MS * stringToReverse.length);
    });

    expect(stringToReverse.join("")).toEqual("");
    expect(mockUnlockButton).toHaveBeenCalled();
  });
});
