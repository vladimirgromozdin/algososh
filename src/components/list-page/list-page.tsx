import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../list-page/list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {LinkedList} from "./list.algorithm";


export const ListPage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [indexInputValue, setIndexInputValue] = useState<number | null>(null);
    const [linkedList, setLinkedList] = useState(new LinkedList<number>());

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericInputValue = Number(e.target.value);
        setIndexInputValue(numericInputValue);
    };

    const handleAddToHead = () => {
        linkedList.prepend(parseInt(inputValue));
        setLinkedList(linkedList);
        setInputValue('');
        console.log(linkedList.print());
    };

    const handleAddToTail = () => {
        if (inputValue.trim() === '') {
            console.log('Please enter a value'); // Or handle this case as needed
            return;
        }

        const valueToAdd = parseInt(inputValue);
        if (isNaN(valueToAdd)) {
            console.log('Please enter a valid number');
            return;
        }
        linkedList.append(valueToAdd);
        setLinkedList(linkedList);
        setInputValue('');
        console.log(linkedList.print());
    }

    const handleAddAtIndex = () => {
        if (inputValue.trim() === '' || indexInputValue === null) {
            console.log('Please enter both a value and an index'); // Or handle this case as needed
            return;
        }

        const valueToAdd = parseInt(inputValue);
        if (isNaN(valueToAdd)) {
            console.log('Please enter a valid number for the value'); // Or handle this case as needed
            return;
        }

        if (indexInputValue < 0 || indexInputValue > linkedList.getSize()) {
            console.log('Invalid index'); // Or handle this case as needed
            return;
        }

        linkedList.insertAtIndex(valueToAdd, indexInputValue);
        setLinkedList(linkedList.clone());
        setInputValue(''); // Optionally clear the input field after adding
        setIndexInputValue(null); // Optionally clear the index input field
        console.log(linkedList.print());
    };

    const handleRemoveFromHead = () => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        linkedList.deleteFromHead();
        setLinkedList(linkedList.clone());
        console.log(linkedList.print());
    }

    const handleRemoveFromTail = () => {
        if (linkedList.getSize() === 0) {
            console.log('List is empty');
            return;
        }
        linkedList.deleteFromTail();
        setLinkedList(linkedList.clone());
        console.log(linkedList.print());
    };

    const handleRemoveAtIndex = () => {
        if (indexInputValue === null) {
            console.log('Please enter an index'); // Or handle this case as needed
            return;
        }

        if (indexInputValue < 0 || indexInputValue >= linkedList.getSize()) {
            console.log('Invalid index'); // Or handle this case as needed
            return;
        }

        linkedList.deleteAtIndex(indexInputValue);
        setLinkedList(linkedList.clone());
        setIndexInputValue(null); // Optionally clear the index input field after deleting
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
                            onClick={handleAddToHead}
                        />
                        <Button
                            text="Добавить в tail"
                            onClick={handleAddToTail}
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
            </div>
        </SolutionLayout>
    );
};
