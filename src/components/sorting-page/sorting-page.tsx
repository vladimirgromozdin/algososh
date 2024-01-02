import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../sorting-page/sorting-page.module.css"
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {SortingAlgorithms} from "../../types/sorting-algorithms";
import {bubbleSorting, selectionSorting} from "./sorting.algorithm";
import {delay} from "../../utils/delay";
import {ElementStates} from "../../types/element-states";

export const SortingPage: React.FC = () => {
    const [activeButton, setActiveButton] = useState<Direction | null>(null)
    const [isFinished, setIsFinished] = useState<boolean>(true)
    const [candidateIndexes, setCandidateIndexes] = useState<number[] | null>(null)
    const [sortedIndexes, setSortedIndexes] = useState<number[] | null>(null)
    const [array, setArray] = useState<number[] | null>(null)
    const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithms>(SortingAlgorithms.Selection)

    useEffect(() => {
        generateArray()
    }, []);

    const generateArray = () => {
        setSortedIndexes(null)
        const minLen = 3
        const maxLen = 17
        const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
        setArray(Array.from({length}, () => (Math.floor((Math.random() * 101)))))
    }

    const unlockButton = () => {
        setIsFinished(true)
        setCandidateIndexes(null)
    }

    const updateArray = (newArray: number[]) => {
        setArray(newArray)
    }

    const updateSortedIndex = (index: number | null) => {
        if (index === null) {
            setSortedIndexes(null);
        } else {
            setSortedIndexes(prevIndexes => prevIndexes ? [...prevIndexes, index] : [index]);
        }
    };

    const updateCandidateIndexes = (indexes: number[] | null) => {
        if (indexes === null) {
            setCandidateIndexes(null)
        } else {
            setCandidateIndexes(indexes)
        }
    }

    const handleSortingAlgorithmChoice = (algorithm: SortingAlgorithms) => {
        setSortingAlgorithm(algorithm)
    }

    const sortArray = (array: number[] | null, order: Direction) => {
        setIsFinished(false);
        setSortedIndexes(null)
        setActiveButton(order)
        switch (sortingAlgorithm) {
            case SortingAlgorithms.Bubble:
                bubbleSorting(array, order, updateArray, delay, unlockButton, updateCandidateIndexes, updateSortedIndex)
                console.log("Sorted Array (Bubble Sort):", array);
                break;
            case SortingAlgorithms.Selection:
                selectionSorting(array, order, updateArray, delay, unlockButton, updateCandidateIndexes, updateSortedIndex)
                console.log("Sorted Array (Selection Sort):", array);
                break;
        }
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.content}>
                <div className={styles.settingsContainer}>
                    <div className={styles.settingsSortingType}>
                        <RadioInput name="sortingOption" label="Выбор" defaultChecked={true} onChange={() => {
                            handleSortingAlgorithmChoice(SortingAlgorithms.Selection)
                        }}></RadioInput>
                        <RadioInput name="sortingOption" label="Пузырёк" onChange={() => {
                            handleSortingAlgorithmChoice(SortingAlgorithms.Bubble)
                        }}></RadioInput>
                    </div>
                    <div className={styles.settingsSortingOrder}>
                        <Button value="ascending" onClick={() => sortArray(array, Direction.Ascending)}
                                text="По возрастанию" disabled={!isFinished}
                                isLoader={!isFinished && activeButton === Direction.Ascending}
                                sorting={Direction.Ascending}
                                extraClass={styles.sortingButton}></Button>
                        <Button value="descending" onClick={() => sortArray(array, Direction.Descending)}
                                text="По убыванию" disabled={!isFinished}
                                isLoader={!isFinished && activeButton === Direction.Descending}
                                sorting={Direction.Descending}
                                extraClass={styles.sortingButton}></Button>
                    </div>
                    <div className={styles.buttonNewArray}>
                        <Button text="Новый массив" onClick={generateArray} disabled={!isFinished}
                                extraClass={styles.buttonNewArray}></Button>
                    </div>
                </div>
                {array && <ul className={styles.arrayContainer}>
                    {array.map((char, index) => <li key={index}>
                        <Column index={array[index]}
                                state={candidateIndexes?.includes(index) ? ElementStates.Changing : sortedIndexes?.includes(index) ? ElementStates.Modified : ElementStates.Default}/>
                    </li>)}
                </ul>}
            </div>
        </SolutionLayout>
    );
};
