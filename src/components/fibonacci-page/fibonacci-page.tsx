import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../fibonacci-page/fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {fibonacciAlgorithm} from "./fibonacci.algorithm";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true)
    const [sequence, setSequence] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [inputValue, setInputValue] = useState<number | ''>('');

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? '' : Number(e.target.value);
        setInputValue(newValue)
    }

    const renderSequence = (length: number) => {
        setIsFinished(false)
        if (inputValue !== null) {
            const newSequence: string[] = []
            let i = 1;
            const addNumberToSequence = () => {
                if (i <= length) {
                    const fibNumber = String(fibonacciAlgorithm(i));
                    newSequence.push(fibNumber);
                    setSequence([...newSequence]);
                    i++
                    setTimeout(addNumberToSequence, SHORT_DELAY_IN_MS)
                } else {
                    setIsFinished(true)
                }
            }
            addNumberToSequence();
        }
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <Input onChange={onInputChange} value={inputValue} type="number" placeholder={'Введите текст'} max={19}
                           isLimitText={true}/>
                    <Button onClick={() => inputValue !== null && renderSequence(Number(inputValue))} text={'Рассчитать'}
                            disabled={!isFinished || !inputValue || inputValue>19} isLoader={!isFinished}/>
                </div>
                <div>
                    {sequence && <ul className={styles.list}>
                        {sequence.map((char, index) => <li key={index}>
                            <Circle letter={char} index={index}
                                    state={ElementStates.Default}/>
                        </li>)}
                    </ul>}
                </div>
            </div>
        </SolutionLayout>
    );
};
