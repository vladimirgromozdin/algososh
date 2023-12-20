import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../queue-page/queue.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {delay} from "../../utils/delay";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {createQueue, IQueue} from "./queue.algorithm";

export const QueuePage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [queue, setQueue] = useState<IQueue<string>>(createQueue<string>(7));
    const [visualQueue, setVisualQueue] = useState<string[]>(Array(7).fill(""));

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddToQueue = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue === "") {
            throw new Error("Input can't be empty");
        } else {
            setIsFinished(false);
            const newQueue = queue.enqueue(inputValue);

            // Use the tail index from newQueue, not from the original queue
            const newVisualQueue = [...visualQueue];
            newVisualQueue[newQueue.tail] = inputValue;

            setVisualQueue(newVisualQueue);
            setInputValue("");
            await delay(DELAY_IN_MS);
            setQueue(newQueue);
            setIsFinished(true);

            // Log the tail index from the updated queue
            console.log("Updated tail index:", newQueue.tail);
        }
    };


    const handleRemoveFromQueue = async (delay: (ms: number) => Promise<void>) => {
        setIsFinished(false);
        const newQueue = queue.dequeue();
        setQueue(newQueue);
        await delay(DELAY_IN_MS);
        const newVisualQueue = [...visualQueue];
        newVisualQueue[queue.head] = "";
        setVisualQueue(newVisualQueue);
        setIsFinished(true);
    };

    const handleClearQueue = () => {
        setQueue(createQueue<string>());
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
                            disabled={(queue.tail + 1) % 7 === queue.head && visualQueue[queue.head] !== ""}
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
                                        letter={char}
                                        index={index}
                                        head={!isQueueEmpty() && index === queue.head ? 'head' : undefined}
                                        tail={!isQueueEmpty() && index === queue.tail ? 'tail' : undefined}
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