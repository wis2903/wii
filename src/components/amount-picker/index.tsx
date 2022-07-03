import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    defaultValue: number,
    onChange?: (value: number) => void,
}

const AmountPicker = ({ className, defaultValue, onChange }: IProps): JSX.Element => {
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
        <div className={classname([styles.container, className])}>
            <button className={styles.minus} onClick={handleMinus} />
            <input type="number" value={value} onChange={(): void => undefined} />
            <button className={styles.plus} onClick={handlePlus} />
        </div>
    );
};

export default AmountPicker;