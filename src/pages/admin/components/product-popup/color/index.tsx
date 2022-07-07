import React from 'react';
import Button from '../../../../../components/basic/button';
import ImageUpload from '../../../../../components/basic/image-upload';
import Tooltip from '../../../../../components/basic/tooltip';
import ColorPicker from '../../../../../components/color-picker';
import { colors } from '../../../../../resources/constants/color';
import styles from './styles.module.scss';

interface IProps {
    data: IColor,
    unremovable?: boolean,
    onDelete?: () => void,
    onUpdate?: (color: IColor, files: File[]) => void,
}

const ProductColor = ({ data, unremovable, onDelete, onUpdate }: IProps): JSX.Element => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [color, setColor] = React.useState<IColor>(colors.white);

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <ColorPicker
                    colors={Object.keys(colors).map(key => colors[key])}
                    onChange={(c): void => {
                        setColor(c);
                        if (onUpdate) onUpdate(c, files);
                    }}
                />
                {
                    !!files.length
                    &&
                    <div className={styles.images}>
                        {files.map((item, i) =>
                            <div
                                key={`file-image-${i}-${+new Date()}`}
                                className={styles.imagePreview}
                                style={{
                                    backgroundImage: `url(${URL.createObjectURL(item)})`
                                }}
                            />
                        )}
                    </div>
                }
                <ImageUpload className={styles.imageUpload} onChange={(data): void => {
                    setFiles(data);
                    if (onUpdate) onUpdate(color, data);
                }} />
            </div>
            {
                !unremovable
                &&
                <Tooltip text='Xóa' className={styles.removeButtonWrapper}>
                    <Button className={styles.removeButton} onClick={onDelete} />
                </Tooltip>
            }
        </div>
    );
};

export default ProductColor;