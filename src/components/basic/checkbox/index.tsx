import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    checked?: boolean,
    label?: string,
    onChecked?: VoidFunction,
    onUnchecked?: VoidFunction,
    clear?: (func: VoidFunction) => void,
}

const Checkbox = ({ className, checked, label, onChecked, onUnchecked, clear }: IProps): JSX.Element => {
    const [isChecked, setIsChecked] = React.useState<boolean>(Boolean(checked));

    const clearCheckbox = (): void => {
        setIsChecked(false);
    };

    const handleToggleChecked = (): void => {
        const nIsChecked = !isChecked;
        setIsChecked(nIsChecked);
        if (nIsChecked && onChecked) onChecked();
        else if (!nIsChecked && onUnchecked) onUnchecked();
    };

    React.useEffect(() => {
        if(clear) clear(clearCheckbox);
    }, []);

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