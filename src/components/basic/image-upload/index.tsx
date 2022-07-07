/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import Button from '../button';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onChange?: (files: File[]) => void,

}

const ImageUpload = ({ className, onChange }: IProps): JSX.Element => {
    const handleOnInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files = e.target.files;
        if (files && onChange) {
            const res: File[] = [];
            for (let i = 0; i < files.length; i++) res.push(files[i]);
            onChange(res);
        }
        e.target.value = '';

    };

    return (
        <div className={classname([styles.container, className])}>
            <input type='file' accept='image/*' multiple onChange={handleOnInputChange} />
            <Button
                label='Tải hình ảnh từ máy tính'
                icon={{
                    type: 'fa',
                    value: 'fa fa-images',
                }}
            />
        </div>
    );
};

export default ImageUpload;