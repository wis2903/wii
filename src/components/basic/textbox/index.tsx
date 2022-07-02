import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string,
    label: string,
}

const Textbox = ({ className, label, ...rest }: IProps): JSX.Element => {
    const [value, setValue] = React.useState<string>(rest.defaultValue ? String(rest.defaultValue) : '');
    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const val = String(e.target.value);
        setValue(val);
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(true);
        if (rest.onFocus) rest.onFocus(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(false);
        if (rest.onBlur) rest.onBlur(e);
    };

    return (
        <div className={classname([styles.container, className, (isFocusing || value) && styles.focus])}>
            <span className={styles.label}>{label}</span>
            <textarea {...rest} value={value} rows={4} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} />
        </div>
    );
};

export default Textbox;