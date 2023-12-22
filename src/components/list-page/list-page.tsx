import React, {ChangeEvent, useEffect, useState} from "react";
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
    const [inputValue, setInputValue] = useState<string | number>("");
    const [indexInputValue, setIndexInputValue] = useState<number | null>(null);
    const [linkedList, setLinkedList] = useState(new LinkedList<string | number>());
    const [visualLinkedList, setVisualLinkedList] = useState<(string | number)[]>([]);
    const [temporaryHead, setTemporaryHead] = useState<string | React.ReactElement | undefined>('top');
    const [temporaryTail, setTemporaryTail] = useState<string | React.ReactElement | undefined>('tail');
    const [temporaryNode, setTemporaryNode] = useState<string | React.ReactElement | undefined>('');
    const [isRemovingAtIndex, setIsRemovingAtIndex] = useState<boolean>(false);
    const [nextElementPosition, setNextElementPosition] = useState<number | null>(null);
    const [isAddingAtIndex, setIsAddingAtIndex] = useState<boolean>(false);
    const [newElementIndex, setNewElementIndex] = useState<number | null>(null);
    const [isAddingHead, setIsAddingHead] = useState(false);
    const [isAddingTail, setIsAddingTail] = useState(false);
    const [isRemovingHead, setIsRemovingHead] = useState(false);
    const [isRemovingTail, setIsRemovingTail] = useState(false);
    const [currentHighlightIndex, setCurrentHighlightIndex] = useState<number[]>([])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericInputValue = Number(e.target.value);
        setIndexInputValue(numericInputValue);
    };

    const generateNotSoRandomArray = () => {
        setVisualLinkedList([0, 34, 8, 1, 69])
        linkedList.append(parseInt("0"))
        linkedList.append(parseInt("34"))
        linkedList.append(parseInt("8"))
        linkedList.append(parseInt("1"))
        linkedList.append(parseInt("69"))
    }

    useEffect(() => {
        generateNotSoRandomArray()
    }, []);

    const handleAddToHead = async (delay: (ms: number) => Promise<void>) => {
        setIsFinished(false)
        setIsAddingHead(true)
        linkedList.prepend(inputValue);
        setTemporaryHead(<Circle state={ElementStates.Changing} isSmall={true} letter={inputValue.toString()}/>);
        setTimeout(() => {
            setTemporaryHead('head');
        }, DELAY_IN_MS);
        setLinkedList(linkedList);
        await delay(DELAY_IN_MS)
        setNewElementIndex(0);
        setTimeout(() => {
            setNewElementIndex(null);
        }, DELAY_IN_MS);
        setVisualLinkedList(linkedList.toArray());
        setInputValue('');
        setIsFinished(true)
        setIsAddingHead(false)
        setTemporaryHead('head')
    };

    const handleAddToTail = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue === '') {
            console.log('Please enter a value');
            return;
        }
        setIsFinished(false)
        setIsAddingTail(true)
        linkedList.append(inputValue);
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
        setIsFinished(true)
        setIsAddingTail(false)
        setTemporaryTail('tail')
    }

    const handleAddAtIndex = async (delay: (ms: number) => Promise<void>) => {
        if (inputValue === '' || indexInputValue === null) {
            console.log('Please enter both a value and an index');
            return;
        }
        setIsFinished(false)
        setIsAddingAtIndex(true)
        const nodeValue = visualLinkedList[indexInputValue].toString();
        setTemporaryNode(<Circle state={ElementStates.Changing} isSmall={true} letter={nodeValue}/>);
        for (let i = 0; i <= indexInputValue - 1; i++) {
            setCurrentHighlightIndex(prevIndices => [...prevIndices, i]);
            setNextElementPosition(i + 1); //
            await delay(DELAY_IN_MS);
        }
        const valueToAdd = (inputValue);

        if (indexInputValue < 0 || indexInputValue > linkedList.getSize()) {
            console.log('Invalid index');
            return;
        }

        linkedList.insertAtIndex(valueToAdd, indexInputValue);
        setLinkedList(linkedList.clone());
        setVisualLinkedList(linkedList.toArray());
        setNextElementPosition(null)
        setCurrentHighlightIndex([])
        setInputValue('');
        setIndexInputValue(null);
        setIsAddingAtIndex(false)
        setIsFinished(true)
    };

    const handleRemoveFromHead = async (delay: (ms: number) => Promise<void>) => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        setIsFinished(false)
        setIsRemovingHead(true)
        setTemporaryHead(<Circle state={ElementStates.Changing} isSmall={true}
                                 letter={visualLinkedList[0].toString()}/>);
        setIsRemovingHead(true)
        linkedList.deleteFromHead();
        setLinkedList(linkedList.clone());
        setTimeout(() => {
            setTemporaryHead('head');
        }, DELAY_IN_MS);
        await delay(DELAY_IN_MS)
        setIsRemovingHead(false);
        setVisualLinkedList(linkedList.toArray());
        setIsRemovingHead(false)
        setIsFinished(true)
    }

    const handleRemoveFromTail = async (delay: (ms: number) => Promise<void>) => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        setIsFinished(false)
        setIsRemovingTail(true);
        const tailValue = visualLinkedList[visualLinkedList.length - 1].toString();
        setTemporaryTail(<Circle state={ElementStates.Changing} isSmall={true} letter={tailValue}/>);

        linkedList.deleteFromTail();
        setLinkedList(linkedList.clone());
        setTimeout(() => {
            setTemporaryTail('tail');
        }, DELAY_IN_MS);
        await delay(DELAY_IN_MS);
        setIsRemovingTail(false);
        setVisualLinkedList(linkedList.toArray());
        setIsFinished(true)
    };


    const handleRemoveAtIndex = async (delay: (ms: number) => Promise<void>) => {
        if (indexInputValue === null) {
            console.log('Please enter an index');
            return;
        }
        setIsFinished(false)
        setIsRemovingAtIndex(true)
        for (let i = 0; i <= indexInputValue - 1; i++) {
            setCurrentHighlightIndex(prevIndices => [...prevIndices, i]);
            await delay(DELAY_IN_MS);
        }

        if (indexInputValue < 0 || indexInputValue >= linkedList.getSize()) {
            console.log('Invalid index');
            return;
        }
        const nodeValue = visualLinkedList[indexInputValue].toString();
        setTemporaryNode(<Circle state={ElementStates.Changing} isSmall={true} letter={nodeValue}/>);
        linkedList.deleteAtIndex(indexInputValue);
        setLinkedList(linkedList.clone());
        await delay(DELAY_IN_MS);
        setVisualLinkedList(linkedList.toArray());
        setCurrentHighlightIndex([])
        setIsRemovingAtIndex(false);
        setIndexInputValue(null);
        setIsRemovingAtIndex(false);
        setIsFinished(true)
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
                            disabled={!isFinished || inputValue === ''}
                            isLoader={isAddingHead}
                        />
                        <Button
                            text="Добавить в tail"
                            onClick={() => handleAddToTail(delay)}
                            disabled={!isFinished || inputValue === ''}
                            isLoader={isAddingTail}
                        />
                        <Button
                            text="Удалить из head"
                            onClick={() => handleRemoveFromHead(delay)}
                            disabled={!isFinished}
                            isLoader={isRemovingHead}
                        />
                        <Button
                            text="Удалить из tail"
                            onClick={() => handleRemoveFromTail(delay)}
                            disabled={!isFinished}
                            isLoader={isRemovingTail}
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
                            onClick={() => handleAddAtIndex(delay)}
                            extraClass={styles.largeButtons}
                            text="Добавить по индексу"
                            disabled={!isFinished || (indexInputValue === null)}
                            isLoader={isAddingAtIndex}
                        />
                        <Button
                            extraClass={styles.largeButtons}
                            text="Удалить по индексу"
                            onClick={() => handleRemoveAtIndex(delay)}
                            disabled={!isFinished || (indexInputValue === null)}
                            isLoader={isRemovingAtIndex}
                        />
                    </div>
                </div>
                <div>
                    {visualLinkedList && (
                        <ul className={styles.linkedList}>
                            {visualLinkedList.map((char, index) => (
                                <li key={index}>
                                    <Circle
                                        state={(index === newElementIndex) ? ElementStates.Modified :
                                            currentHighlightIndex.includes(index) ? ElementStates.Changing :
                                                ElementStates.Default}
                                        letter={(isRemovingHead && index === 0) ||
                                        (isRemovingTail && index === visualLinkedList.length - 1) ||
                                        (isRemovingAtIndex && index === indexInputValue) ? "" : char.toString()}
                                        index={index}
                                        head={index === 0 ? temporaryHead :
                                            index === nextElementPosition ? temporaryNode : undefined}
                                        tail={index === visualLinkedList.length - 1 && !isRemovingAtIndex ? temporaryTail :
                                            index === indexInputValue && isRemovingAtIndex ? temporaryNode : undefined}
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
