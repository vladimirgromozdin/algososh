import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "../string/string.module.css";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./string.algorithm";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [isFinished, setIsFinished] = useState<boolean>(true);
  const [candidateIndexes, setCandidateIndexes] = useState<number[] | null>(
    null,
  );
  const [reversedIndexes, setReversedIndexes] = useState<number[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentStringArray, setCurrentStringArray] = useState<string[]>([]);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateStringArray = (newArray: string[]) => {
    setCurrentStringArray([...newArray]);
  };

  const updateCandidateIndexes = (
    left: number | null,
    right: number | null,
  ) => {
    if (left === null || right === null) {
      setCandidateIndexes(null);
    } else {
      setCandidateIndexes([left, right]);
    }
  };

  const updateReversedIndexes = (
    left: number | null,
    right: number | null,
    middleIndex?: number,
  ) => {
    setReversedIndexes((prevIndexes) => {
      let newIndexes = prevIndexes ? [...prevIndexes] : [];
      if (middleIndex !== undefined) {
        newIndexes.push(middleIndex);
      } else {
        if (left !== null) {
          newIndexes.push(left);
        }
        if (right !== null) {
          newIndexes.push(right);
        }
      }
      console.log(newIndexes);
      return newIndexes;
    });
  };

  const unlockButton = () => {
    setIsFinished(true);
    setCandidateIndexes(null);
  };

  const handleStringReversal = () => {
    setIsFinished(false);
    const arrayFromString = Array.from(inputValue);
    setReversedIndexes([]);
    setCandidateIndexes([0, inputValue.length - 1]);
    setCurrentStringArray(arrayFromString);
    setTimeout(() => {
      reverseString(
        arrayFromString,
        0,
        inputValue.length - 1,
        unlockButton,
        updateCandidateIndexes,
        updateReversedIndexes,
        updateStringArray,
      );
    }, DELAY_IN_MS);
  };

  const determineElementState = (index: number) => {
    if (reversedIndexes?.includes(index)) {
      return ElementStates.Modified;
    }
    if (candidateIndexes?.includes(index)) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <Input
            onChange={onInputChange}
            placeholder={"Введите текст"}
            maxLength={11}
            isLimitText={true}
          />
          <Button
            onClick={handleStringReversal}
            text={"Развернуть"}
            disabled={!isFinished || inputValue === ""}
            isLoader={!isFinished}
          />
        </div>
        <div>
          {currentStringArray && (
            <ul className={styles.list}>
              {currentStringArray.map((char, index) => (
                <li key={index}>
                  <Circle
                    letter={char}
                    index={index}
                    state={determineElementState(index)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
