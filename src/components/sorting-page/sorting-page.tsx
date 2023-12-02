import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../sorting-page/sorting-page.module.css"
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";

export const SortingPage: React.FC = () => {
    const [array, setArray] = useState<number[] | null>([])
    const generateArray = () => {
        const minLen = 3
        const maxLen = 17
        const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
        setArray(Array.from({length}, () => (Math.floor((Math.random() * 101)))))
    }


    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.content}>
                <div className={styles.settingsContainer}>
                    <div className={styles.settingsSortingType}>
                        <RadioInput name="sortingOption" label="Выбор" defaultChecked={true}></RadioInput>
                        <RadioInput name="sortingOption" label="Пузырёк"></RadioInput>
                    </div>
                    <div className={styles.settingsSortingOrder}>
                        <Button value="ascending" text="По возрастанию" disabled={false} sorting={Direction.Ascending}
                                extraClass={styles.sortingButton}></Button>
                        <Button value="descending" text="По убыванию" disabled={false} sorting={Direction.Descending}
                                extraClass={styles.sortingButton}></Button>
                    </div>
                    <div className={styles.buttonNewArray}>
                        <Button text="Новый массив" onClick={generateArray} disabled={false} isLoader={false}
                                extraClass={styles.buttonNewArray}></Button>
                    </div>
                </div>
                {array && <ul className={styles.arrayContainer}>
                    {array.map((char, index) => <li key={index}>
                        <Column index={array[index]}/>
                    </li>)}
                </ul>}
            </div>
        </SolutionLayout>
    );
};
