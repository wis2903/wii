import React from 'react';
import Blank from '../../../../../../components/basic/blank';
import Input from '../../../../../../components/basic/input';
import RemoveButton from '../../../../../../components/basic/remove-button';
import styles from './styles.module.scss';

interface IProps {
    title?: string,
    initValue?: string,
    required?: boolean,
    hidden?: boolean,
    onChange?: (key: string, value: string, validation: () => boolean) => void,
    onDelete?: VoidFunction,
}
interface IInputState {
    value: string,
    error?: string,
}

const ProductAttribute = ({ title, initValue, hidden, required, onChange, onDelete }: IProps): JSX.Element => {
    const [key, setKey] = React.useState<IInputState>({ value: title || '' });
    const [value, setValue] = React.useState<IInputState>({ value: initValue || '' });

    const validate = (): boolean => {
        let flag = true;
        if (required) {
            if (!key.value) {
                setKey(current => ({
                    ...current,
                    error: 'Vui lòng nhập tiêu đề',
                }));
                flag = false;
            }

            if (!value.value) {
                setValue(current => ({
                    ...current,
                    error: 'Vui lòng nhập nội dung',
                }));
                flag = false;
            }
        }

        return flag;
    };

    React.useEffect(() => {
        if (onChange) onChange(key.value, value.value, validate);
    }, [key.value, value.value]);

    if (hidden) return <Blank />;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <Input
                    className={styles.input}
                    label='Tiêu đề'
                    initValue={title}
                    disabled={required}
                    required={required}
                    error={key.error}
                    onValueChange={(val): void => {
                        setKey({ value: val });
                    }}
                />
                <Input
                    className={styles.input}
                    label='Nội dung'
                    initValue={initValue}
                    required={required}
                    error={value.error}
                    onValueChange={(val): void => {
                        setValue({ value: val });
                    }}
                />
            </div>

            <RemoveButton
                className={styles.removeButton}
                disabled={required}
                disabledAlertMessage={`Không thể xóa thuộc tính này, thuộc tính '${title}' bắt buộc phải có cho từng sản phẩm.`}
                onClick={onDelete}
            />
        </div>
    );
};

export default ProductAttribute;