import React from 'react';
import Button from '../../../../components/basic/button';
import Input from '../../../../components/basic/input';
import Textbox from '../../../../components/basic/textbox';
import PopupWrapper from '../../../../components/popup/popup-wrapper';
import CategoryService from '../../../../services/category.service';
import styles from './styles.module.scss';

interface IProps {
    onClose?: VoidFunction,
    category?: ICategory,
}
interface IInputState {
    value: string,
    error?: string,
}

const CategoryPopup = ({ onClose, category }: IProps): JSX.Element => {
    const [name, setName] = React.useState<IInputState>({ value: category?.name || '' });
    const [description, setDescription] = React.useState<IInputState>({ value: category?.description || '' });
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

    const validate = (): boolean => {
        let flag = true;

        if (!name.value) {
            setName(current => ({
                ...current,
                error: 'Vui lòng nhập tên danh mục',
            }));
            flag = false;
        }

        return flag;
    };

    const handleAddCategory = async (): Promise<void> => {
        if (isProcessing || !validate()) return;
        setIsProcessing(true);
        await CategoryService.instance.add(name.value, description.value);
        setIsProcessing(false);
        if (onClose) onClose();
    };

    const handleUpdateCategory = async (): Promise<void> => {
        if (!category || isProcessing || !validate()) return;
        setIsProcessing(true);
        await CategoryService.instance.update({
            id: category.id,
            name: name.value,
            description: description.value,
        });
        setIsProcessing(false);
        if (onClose) onClose();
    };

    return (
        <PopupWrapper
            className={styles.container}
            title={{
                text: category ? 'Cập nhật thông tin danh mục' : 'Thêm danh mục mới',
                icon: {
                    type: 'fa',
                    value: category ? 'fa fa-file-lines' : 'fa fa-plus',
                }
            }}
            onClose={onClose}
        >
            <Input
                required
                label='Tên danh mục'
                className={styles.input}
                error={name.error}
                initValue={category?.name}
                onValueChange={(value): void => {
                    setName({ value });
                }}
            />
            <Textbox
                label='Mô tả danh mục (không bắt buộc)'
                error={description.error}
                initValue={category?.description}
                onValueChange={(value): void => {
                    setDescription({ value });
                }}
            />
            <div className={styles.action}>
                <Button secondary label='Hủy' onClick={onClose} />
                {
                    category
                        ? <Button primary label={isProcessing ? 'Đang tải...' : 'Cập nhật'} onClick={handleUpdateCategory} />
                        : <Button primary label={isProcessing ? 'Đang tải...' : 'Thêm'} onClick={handleAddCategory} />
                }
            </div>
        </PopupWrapper>
    );
};

export default CategoryPopup;