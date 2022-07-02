import React from 'react';
import styles from './styles.module.scss';

interface IProps {
    defaultValue: number,
    onChange?: (value: number) => void,
}

const AmountPicker = ({ defaultValue, onChange }: IProps): JSX.Element => {
    const [value, setValue] = React.useState<number>(Math.round(defaultValue));

    const handleMinus = (): void => {
        const val = Math.max(1, value - 1);
        setValue(val);
        if (onChange) onChange(val);
    };

    const handlePlus = (): void => {
        const val = value + 1;
        setValue(val);
        if (onChange) onChange(val);
    };

    return (
        <div className={styles.container}>
            <button className={styles.minus} onClick={handleMinus} />
            <input type="number" value={value} onChange={(): void => undefined} />
            <button className={styles.plus} onClick={handlePlus} />
        </div>
    );
};

export default AmountPicker;