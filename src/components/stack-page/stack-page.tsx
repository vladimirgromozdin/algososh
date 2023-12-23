import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Stack} from "./stack.algorithm";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const StackPage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true)
    const [inputValue, setInputValue] = useState<(string)>("");
    const [stack, setStack] = useState(new Stack<string>());
    const [visualStack, setVisualStack] = useState<(string)[]>([])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddToStack = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue === "") {
            throw new Error("Input can't be empty")
        } else {
            setIsFinished(false)
            const newStack = stack.push(inputValue)
            setVisualStack([...visualStack, inputValue])
            setInputValue("")
            await delay(DELAY_IN_MS)
            setStack(newStack)
            setIsFinished(true)
        }
    }

    const handleRemoveFromStack = async (delay: (ms: number) => Promise<void>) => {
        setIsFinished(false)
        const newStack = stack.pop()
        setStack(newStack)
        await delay(DELAY_IN_MS)
        setVisualStack(visualStack.slice(0, -1))
        setIsFinished(true)
    }

    const handleClearStack = () => {
        setStack(new Stack<string>())
        setVisualStack([])
    }


    return (
        <SolutionLayout title="Стек">
            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <Input value={inputValue} onChange={onInputChange} placeholder={'Введите текст'} maxLength={4}
                           isLimitText={true}/>
                    <div className={styles.settingsSortingOrder}>
                        <Button
                            text="Добавить" disabled={inputValue === ''} onClick={() => handleAddToStack(delay)}>
                        </Button>
                        <Button
                            text="Удалить" disabled={visualStack.length === 0}
                            onClick={() => handleRemoveFromStack(delay)}>
                        </Button>
                    </div>
                    <div className={styles.buttonClear}>
                        <Button text="Очистить"
                                onClick={handleClearStack} disabled={visualStack.length === 0}></Button>
                    </div>
                </div>
                <div>
                    {visualStack && <ul className={styles.stack}>
                        {visualStack.map((char, index) => <li key={index}>
                            <Circle
                                state={index === visualStack.length - 1 && !isFinished ? ElementStates.Changing : ElementStates.Default}
                                letter={char} index={index}
                                head={index === visualStack.length - 1 ? 'top' : undefined}/>
                        </li>)}
                    </ul>}
                </div>
            </div>
        </SolutionLayout>
    );
};
