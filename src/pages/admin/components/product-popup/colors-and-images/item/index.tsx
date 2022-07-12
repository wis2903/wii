import React from 'react';
import Button from '../../../../../../components/basic/button';
import ImageUpload from '../../../../../../components/basic/image-upload';
import RemoveButton from '../../../../../../components/basic/remove-button';
import ColorPicker from '../../../../../../components/color-picker';
import { classname } from '../../../../../../helpers/utils.helper';
import { colors } from '../../../../../../resources/constants/color';
import styles from './styles.module.scss';

interface IProps {
    data: IColor,
    unremovable?: boolean,
    onDelete?: () => void,
    onUpdate?: (color: IColor, files: File[]) => void,
}

const ProductColor = ({ data, unremovable, onDelete, onUpdate }: IProps): JSX.Element => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [color, setColor] = React.useState<IColor>(data);
    const [thumbnail, setThumbnail] = React.useState<File | string | undefined>(data.images?.length ? data.images[0] : '');

    const handleDelete = (): void => {
        if (unremovable) return;
        if (onDelete) onDelete();
    };

    const generateImagesPreview = (): JSX.Element | undefined => {
        if (files.length) return (
            <div className={styles.images}>
                {files.sort((a, b) => {
                    if (a === thumbnail && b !== thumbnail) return -1;
                    return 1;
                }).map((item, i) =>
                    <div
                        key={`file-image-${i}-${+new Date()}`}
                        className={classname([styles.imagePreview, item === thumbnail && styles.active])}
                        style={{
                            backgroundImage: `url(${URL.createObjectURL(item)})`
                        }}
                    >
                        {
                            item !== thumbnail
                            && <Button
                                label='Đặt làm hình đại diện'
                                onClick={(): void => {
                                    setThumbnail(item);
                                }}
                            />
                        }
                    </div>
                )}
            </div>
        );

        if (color.images?.length) return (
            <div className={styles.images}>
                {color.images.sort((a, b) => {
                    if (a === thumbnail && b !== thumbnail) return -1;
                    return 1;
                }).map((item, i) =>
                    <div
                        key={`file-image-${i}-${+new Date()}`}
                        className={classname([styles.imagePreview, item === thumbnail && styles.active])}
                        style={{
                            backgroundImage: `url(${item})`
                        }}
                    >
                        {
                            item !== thumbnail
                            && <Button
                                label='Đặt làm hình đại diện'
                                onClick={(): void => {
                                    setThumbnail(item);
                                }}
                            />
                        }
                    </div>
                )}
            </div>
        );
    };

    React.useEffect(() => {
        if (onUpdate) onUpdate(color, files.sort((a, b) => {
            if (a === thumbnail && b !== thumbnail) return -1;
            return 1;
        }));
    }, [color, files, thumbnail]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <ColorPicker
                    className={styles.colorPicker}
                    colors={Object.keys(colors).map(key => colors[key])}
                    initColor={data}
                    onChange={(c): void => {
                        setColor(current => ({
                            ...c,
                            images: current.images,
                        }));
                    }}
                />
                {generateImagesPreview()}
                <ImageUpload className={styles.imageUpload} onChange={(data): void => {
                    setFiles(data);
                    setThumbnail(data[0]);
                }} />
            </div>
            <RemoveButton
                onClick={handleDelete}
                disabled={unremovable}
                disabledAlertMessage='Không thể xóa vì yêu cầu phải có ít nhất 1 thuộc tính màu sắc và hình ảnh. Chỉ xóa được khi đã thêm màu sắc và hình ảnh khác.'
            />
        </div>
    );
};

export default ProductColor;