import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
    const [isFinished, setIsFinished] = useState<boolean>(true)
    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <Input type="number" placeholder={'Введите текст'} max={19} isLimitText={true}/>
                    <Button text={'Рассчитать'} disabled={!isFinished}/>
                </div>
            </div>
        </SolutionLayout>
    );
};
