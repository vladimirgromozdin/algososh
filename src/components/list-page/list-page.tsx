import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../list-page/list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {LinkedList} from "./list.algorithm";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../utils/delay";
import {ElementStates} from "../../types/element-states";


export const ListPage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [indexInputValue, setIndexInputValue] = useState<number | null>(null);
    const [linkedList, setLinkedList] = useState(new LinkedList<number>());
    const [visualLinkedList, setVisualLinkedList] = useState<number[]>([]);
    const [temporaryHead, setTemporaryHead] = useState<string | React.ReactElement | undefined>('top');
    const [temporaryTail, setTemporaryTail] = useState<string | React.ReactElement | undefined>('tail');
    const [newElementIndex, setNewElementIndex] = useState<number | null>(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericInputValue = Number(e.target.value);
        setIndexInputValue(numericInputValue);
    };

    const handleAddToHead = async (delay: (ms: number) => Promise<void>) => {
        linkedList.prepend(parseInt(inputValue));
        setTemporaryHead(<Circle state={ElementStates.Changing} isSmall={true} letter={inputValue.toString()}/>);
        setTimeout(() => {
            setTemporaryHead('top');
        }, DELAY_IN_MS);
        setLinkedList(linkedList);
        await delay(DELAY_IN_MS)
        setNewElementIndex(0);
        setTimeout(() => {
            setNewElementIndex(null);
        }, DELAY_IN_MS);
        setVisualLinkedList(linkedList.toArray());
        setInputValue('');
        console.log(linkedList.print());
    };

    const handleAddToTail = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue.trim() === '') {
            console.log('Please enter a value'); // Or handle this case as needed
            return;
        }

        // const valueToAdd = parseInt(inputValue);
        // if (isNaN(valueToAdd)) {
        //     console.log('Please enter a valid number');
        //     return;
        // }
        linkedList.append(parseInt(inputValue));
        setTemporaryTail(<Circle state={ElementStates.Changing} isSmall={true} letter={inputValue.toString()}/>);
        setTimeout(() => {
            setTemporaryTail('tail');
        }, DELAY_IN_MS);
        setLinkedList(linkedList);
        await delay(DELAY_IN_MS)
        setNewElementIndex(linkedList.getSize() - 1);
        setTimeout(() => {
            setNewElementIndex(null);
        }, DELAY_IN_MS);
        setVisualLinkedList(linkedList.toArray());
        setInputValue('');
        console.log(linkedList.print());
    }

    const handleAddAtIndex = () => {
        if (inputValue.trim() === '' || indexInputValue === null) {
            console.log('Please enter both a value and an index');
            return;
        }

        const valueToAdd = parseInt(inputValue);
        if (isNaN(valueToAdd)) {
            console.log('Please enter a valid number for the value');
            return;
        }

        if (indexInputValue < 0 || indexInputValue > linkedList.getSize()) {
            console.log('Invalid index');
            return;
        }

        linkedList.insertAtIndex(valueToAdd, indexInputValue);
        setLinkedList(linkedList.clone());
        setVisualLinkedList(linkedList.toArray());
        setInputValue('');
        setIndexInputValue(null);
        console.log(linkedList.print());
    };

    const handleRemoveFromHead = () => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        linkedList.deleteFromHead();
        setLinkedList(linkedList.clone());
        setVisualLinkedList(linkedList.toArray());
        console.log(linkedList.print());
    }

    const handleRemoveFromTail = () => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        linkedList.deleteFromTail();
        setLinkedList(linkedList.clone());
        setVisualLinkedList(linkedList.toArray());
        console.log(linkedList.print());
    };

    const handleRemoveAtIndex = () => {
        if (indexInputValue === null) {
            console.log('Please enter an index');
            return;
        }

        if (indexInputValue < 0 || indexInputValue >= linkedList.getSize()) {
            console.log('Invalid index');
            return;
        }

        linkedList.deleteAtIndex(indexInputValue);
        setLinkedList(linkedList.clone());
        setVisualLinkedList(linkedList.toArray());
        setIndexInputValue(null);
        console.log(linkedList.print());
    };


    return (
        <SolutionLayout title="Связный список">
            <div className={styles.content}>
                <div className={styles.inputContainerTop}>
                    <div className={styles.inputField}>
                        <Input
                            value={inputValue}
                            onChange={onInputChange}
                            placeholder={'Введите текст'}
                            maxLength={4}
                            isLimitText={true}
                        />
                    </div>

                    <div className={styles.settingsTopButtons}>
                        <Button
                            text="Добавить в head"
                            onClick={() => handleAddToHead(delay)}
                        />
                        <Button
                            text="Добавить в tail"
                            onClick={() => handleAddToTail(delay)}
                        />
                        <Button
                            text="Удалить из head"
                            onClick={handleRemoveFromHead}
                        />
                        <Button
                            text="Удалить из tail"
                            onClick={handleRemoveFromTail}
                        />
                    </div>
                </div>
                <div className={styles.inputContainerBottom}>
                    <div className={styles.inputField}>
                        <Input
                            type="number"
                            value={indexInputValue !== null ? indexInputValue : ''}
                            onChange={onIndexInputChange}
                            placeholder={'Введите индекс'}
                        />
                    </div>
                    <div className={styles.settingsBottomButtons}>
                        <Button
                            onClick={handleAddAtIndex}
                            extraClass={styles.largeButtons}
                            text="Добавить по индексу"
                        />
                        <Button
                            extraClass={styles.largeButtons}
                            text="Удалить по индексу"
                            onClick={handleRemoveAtIndex}
                        />
                    </div>
                </div>
                <div>
                    {visualLinkedList && (
                        <ul className={styles.linkedList}>
                            {visualLinkedList.map((char, index) => (
                                <li key={index}>
                                    <Circle
                                        state={index === newElementIndex ? ElementStates.Modified : ElementStates.Default}
                                        letter={char.toString()}
                                        index={index}
                                        head={index === 0 ? temporaryHead : undefined}
                                        tail={index === visualLinkedList.length - 1 ? temporaryTail : undefined}
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
