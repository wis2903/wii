import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    checked?: boolean,
    onChecked?: VoidFunction,
    onUnchecked?: VoidFunction,
    label: string,
}

const Checkbox = ({ className, checked, label, onChecked, onUnchecked }: IProps): JSX.Element => {
    const [isChecked, setIsChecked] = React.useState<boolean>(Boolean(checked));

    const handleToggleChecked = (): void => {
        const nIsChecked = !isChecked;
        setIsChecked(nIsChecked);
        if (nIsChecked && onChecked) onChecked();
        else if (!nIsChecked && onUnchecked) onUnchecked();
    };

    return (
        <button
            className={classname([styles.container, className, isChecked && styles.checked])}
            onClick={handleToggleChecked}
        >
            <span className={styles.checkbox} />
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default Checkbox;