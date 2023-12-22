import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../queue-page/queue.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {delay} from "../../utils/delay";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "./queue.algorithm";
import {ElementStates} from "../../types/element-states";

export const QueuePage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true);
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isRemoving, setIsRemoving] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("");
    const [queue, setQueue] = useState<Queue<string>>(new Queue<string>(7));
    const [visualQueue, setVisualQueue] = useState<string[]>(Array(7).fill(""));

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddToQueue = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue === "") {
            throw new Error("Input can't be empty");
        } else {
            setIsAdding(true)
            setIsFinished(false);
            const newQueue = queue.enqueue(inputValue);
            const newVisualQueue = [...visualQueue];
            newVisualQueue[newQueue.getTail()] = inputValue;
            setVisualQueue(newVisualQueue);
            setInputValue("");
            await delay(DELAY_IN_MS);
            setQueue(newQueue);
            setIsAdding(false)
            setIsFinished(true);
        }
    };


    const handleRemoveFromQueue = async (delay: (ms: number) => Promise<void>) => {
        setIsFinished(false);
        setIsRemoving(true)
        const newVisualQueue = [...visualQueue];
        newVisualQueue[queue.getHead()] = "";
        const newQueue = queue.dequeue();
        setVisualQueue(newVisualQueue);
        await delay(DELAY_IN_MS);
        setQueue(newQueue);
        setIsFinished(true);
        setIsRemoving(false)
    };

    const handleClearQueue = () => {
        setQueue(new Queue<string>());
        setVisualQueue(Array(7).fill(""));
    };

    const isQueueEmpty = (): boolean => {
        return visualQueue.every(item => item === "");
    };

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <Input
                        value={inputValue}
                        onChange={onInputChange}
                        placeholder={'Введите текст'}
                        maxLength={4}
                        isLimitText={true}
                    />
                    <div className={styles.settingsSortingOrder}>
                        <Button
                            disabled={(queue.getTail() + 1) % 7 === queue.getHead() && visualQueue[queue.getHead()] !== ""}
                            text="Добавить"
                            onClick={() => handleAddToQueue(delay)}
                        />
                        <Button
                            text="Удалить"
                            disabled={isQueueEmpty()}
                            onClick={() => handleRemoveFromQueue(delay)}
                        />
                    </div>
                    <div className={styles.buttonClear}>
                        <Button
                            text="Очистить"
                            onClick={handleClearQueue}
                            disabled={isQueueEmpty()}
                        />
                    </div>
                </div>
                <div>
                    {visualQueue && (
                        <ul className={styles.stack}>
                            {visualQueue.map((char, index) => (
                                <li key={index}>
                                    <Circle
                                        state={((isAdding && index === queue.getTail()) || (isRemoving && index === (queue.getHead() - 1))) ? ElementStates.Changing : ElementStates.Default}
                                        letter={char}
                                        index={index}
                                        head={!isQueueEmpty() && index === queue.getHead() ? 'head' : undefined}
                                        tail={!isQueueEmpty() && index === queue.getTail() ? 'tail' : undefined}
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