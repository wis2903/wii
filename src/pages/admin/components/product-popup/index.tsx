import React from 'react';
import Button from '../../../../components/basic/button';
import PopupWrapper from '../../../../components/popup/popup-wrapper';
import { getRandomNumber } from '../../../../helpers/utils.helper';
import FirebaseService from '../../../../services/firebase.service';
import ProductService from '../../../../services/product.service';
import UtilsService from '../../../../services/utils.service';
import ProductAttributes from './attributes';
import ProductBasicInfo from './basic-info';
import ProductColorsAndImages from './colors-and-images';
import styles from './styles.module.scss';

interface IProps {
    category: ICategory,
    product?: IProduct,
    disabled?: boolean,
    onClose?: VoidFunction,
    onAdded?: (product: IProduct) => void,
    onUpdated?: (product: IProduct) => void,
}
export interface IProductColorState {
    id: number | string,
    color: IColor,
    files?: File[],
}

const ProductPopup = ({ category, product, disabled, onClose, onAdded, onUpdated }: IProps): JSX.Element => {
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [basicInfo, setBasicInfo] = React.useState<Partial<IProductBasicInfo>>({});
    const [attributes, setAttributes] = React.useState<IProductAttribute[]>([]);
    const [productColors, setProductColors] = React.useState<IProductColorState[]>([]);
    const validateBasicInfo = React.useRef<() => boolean>();
    const validateAtrributes = React.useRef<() => boolean>();

    const validate = (): boolean => {
        let flag = true;
        if (validateBasicInfo.current && !validateBasicInfo.current()) flag = false;
        if (validateAtrributes.current && !validateAtrributes.current()) flag = false;
        if (!flag) {
            UtilsService.instance.alert('Bạn chưa điền đầy đủ thông tin sản phẩm. Vui lòng kiểm tra lại và điền đầy đủ thông tin.');
            return false;
        }
        let hasImages = false;
        productColors.forEach(item => {
            if (item.color.images?.length) hasImages = true;
            if (item.files?.length) hasImages = true;
        });
        if (!hasImages) {
            UtilsService.instance.alert('Bạn chưa tải hình ảnh nào cho sản phẩm. Vui lòng tải lên ít nhất 1 hình ảnh.');
            return false;
        }

        return flag;
    };

    const handleProcessColorImages = async (): Promise<IColor[]> => {
        const cs: IColor[] = [];
        for (let i = 0; i < productColors.length; i++) {
            let imageUrls: string[] = productColors[i].color.images || [];
            const item = productColors[i];
            if (item.files?.length) {
                imageUrls = [];
                for (let j = 0; j < item.files.length; j++) {
                    const url = await FirebaseService.instance.uploadFile(item.files[j]);
                    imageUrls.push(url);
                }
            }
            cs.push({
                label: item.color.label,
                value: item.color.value,
                images: imageUrls,
            });
        }
        return cs;
    };

    const handleUpdateProduct = async (): Promise<void> => {
        if (!product || isProcessing || !validate()) return;
        setIsProcessing(true);
        const cs = await handleProcessColorImages();
        const newProductData: IProduct = {
            ...product,
            ...basicInfo as IProductBasicInfo,
            attributes,
            colors: cs,
        };
        await ProductService.instance.update(newProductData);
        setIsProcessing(false);
        if (onUpdated) onUpdated(newProductData);
        if (onClose) onClose();
    };

    const handleAddProduct = async (): Promise<void> => {
        if (isProcessing || !validate()) return;
        setIsProcessing(true);
        const cs = await handleProcessColorImages();
        const newProductData: IProducWithoutId = {
            ...basicInfo as IProductBasicInfo,
            categoryId: category.id,
            attributes,
            colors: cs,
            rating: Math.round(getRandomNumber(3, 5)) / 5,
            buyersNumber: Math.round(getRandomNumber(50, 300)),
            timestamp: +new Date(),
        };

        const id = await ProductService.instance.add(newProductData);
        setIsProcessing(false);
        if (id && onAdded) onAdded({ ...newProductData, id });
        if (onClose) onClose();
    };

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            onClose={onClose}
            title={{
                text: product ? 'Cập nhật thông tin sản phẩm' : `Thêm sản phẩm danh mục: ${category.name}`,
                icon: {
                    type: 'fa',
                    value: product ? 'fa fa-pen' : 'fa fa-plus'
                }
            }}
            footer={!disabled && (
                <>
                    <Button label='Hủy' onClick={onClose} />
                    {
                        product
                            ? <Button primary label={isProcessing ? 'Đang tải...' : 'Cập nhật'} onClick={handleUpdateProduct} />
                            : <Button primary label={isProcessing ? 'Đang tải...' : 'Thêm'} onClick={handleAddProduct} />
                    }
                </>
            )}
        >
            <div className={styles.mainContent}>
                <div className={styles.left}>
                    <ProductBasicInfo
                        disabled={disabled}
                        product={product}
                        onChange={(data): void => {
                            setBasicInfo(data);
                        }}
                        validation={(func): void => {
                            validateBasicInfo.current = func;
                        }}
                    />
                    <ProductAttributes
                        disabled={disabled}
                        product={product}
                        onChange={(data): void => {
                            setAttributes(data);
                        }}
                        validation={(func): void => {
                            validateAtrributes.current = func;
                        }}
                    />
                </div>
                <div className={styles.right}>
                    <ProductColorsAndImages
                        disabled={disabled}
                        product={product}
                        onChange={(data): void => {
                            setProductColors(data);
                        }}
                    />
                </div>
            </div>
        </PopupWrapper>
    );
};

export default ProductPopup;