import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

const Input = ({ className, label, icon, required, disabled, error, initValue, inputRef, onValueChange, onEnter, ...rest }: IInputComponentProps): JSX.Element => {
    const [value, setValue] = React.useState<string>(initValue ? String(initValue) : '');
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
        if (onValueChange) onValueChange(val);
    };

    const handleOnInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (rest.onKeyUp) rest.onKeyUp(e);
        if (e.key === 'Enter' && onEnter) onEnter();
    };

    const generateIconEl = (): JSX.Element | null => {
        let ico = null;
        if (icon?.type === 'image') {
            ico = <img src={icon.value} alt="icon" className={styles.icon} />;
        }
        if (icon?.onClick) {
            return <button className={styles.iconWrapper} onClick={icon.onClick}>{ico}</button>;
        }

        return ico;
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={classname([styles.wrapper, (value || isFocusing) && styles.focus, isFocusing && styles.focusing, disabled && styles.disabled, error && styles.hasError])}>
                <span className={styles.label}>
                    {label}
                    {
                        required
                        &&
                        <i>*</i>
                    }
                </span>
                <input
                    {...rest}
                    ref={inputRef}
                    disabled={disabled}
                    value={value}
                    onFocus={handleOnInputFocus}
                    onBlur={handleOnInputBlur}
                    onChange={handleInputChange}
                    onKeyUp={handleOnInputKeyUp}
                />
                {generateIconEl()}
            </div>
            {
                !!error?.length
                &&
                <div className={styles.error}>{error}</div>
            }
        </div>
    );
};

export default Input;