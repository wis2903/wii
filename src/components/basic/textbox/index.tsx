import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string,
    required?: boolean,
    label: string,
    error?: string,
    initValue?: string,
    onValueChange?: (value: string) => void,
    clear?: (func: VoidFunction) => void,
}

const Textbox = ({ className, label, required, disabled, error, initValue, onValueChange, clear, ...rest }: IProps): JSX.Element => {
    const [value, setValue] = React.useState<string>(initValue ? String(initValue) : '');
    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const val = String(e.target.value);
        setValue(val);
        if (onValueChange) onValueChange(val);
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(true);
        if (rest.onFocus) rest.onFocus(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(false);
        if (rest.onBlur) rest.onBlur(e);
    };

    React.useEffect(() => {
        if (clear) clear(() => {
            setValue('');
        });
    }, []);

    return (
        <div className={classname([styles.container, className,])}>
            <div className={classname([styles.wrapper, (isFocusing || value) && styles.focus, disabled && styles.disabled, error && styles.hasError])}>
                <span className={styles.label}>
                    {label}
                    {
                        required
                        &&
                        <i>*</i>
                    }
                </span>
                <textarea {...rest} disabled={disabled} value={value} rows={4} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} />
            </div>

            {
                !!error?.length
                &&
                <div className={styles.error}>{error}</div>
            }
        </div>
    );
};

export default Textbox;