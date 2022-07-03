import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

const Input = ({ className, label, icon, required, ...rest }: IInputComponentProps): JSX.Element => {
    const [value, setValue] = React.useState<string>(rest.defaultValue ? String(rest.defaultValue) : '');
    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);

    const handleOnInputFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        if (rest.onFocus) rest.onFocus(e);
        setIsFocusing(true);
    };

    const handleOnInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        if (rest.onBlur) rest.onBlur(e);
        setIsFocusing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const val = e.target.value ? String(e.target.value) : '';
        setValue(val);
    };

    return (
        <div className={classname([styles.container, className, (value || isFocusing) && styles.focus, isFocusing && styles.focusing])}>
            <span className={styles.label}>
                {label}
                {
                    required
                    &&
                    <i>*</i>
                }
            </span>
            <input {...rest} value={value} onFocus={handleOnInputFocus} onBlur={handleOnInputBlur} onChange={handleInputChange} />
            {
                !!icon
                &&
                <img src={icon} alt="icon" className={styles.icon} />
            }
        </div>
    );
};

export default Input;