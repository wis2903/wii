import React from 'react';
import Button from '../../../../components/basic/button';
import Input from '../../../../components/basic/input';
import Textbox from '../../../../components/basic/textbox';
import PopupWrapper from '../../../../components/popup/popup-wrapper';
import { getRandomNumber } from '../../../../helpers/utils.helper';
import { colors } from '../../../../resources/constants/color';
import { numberRegex } from '../../../../resources/constants/regex';
import FirebaseService from '../../../../services/firebase.service';
import ProductService from '../../../../services/product.service';
import ProductColor from './color';
import styles from './styles.module.scss';

interface IProps {
    category: ICategory,
    product?: IProduct,
    onClose?: VoidFunction,
    onAdded?: (product: IProduct) => void,
}
interface IProductColorState {
    id: number,
    color: IColor,
    files: File[],
}
interface IInputState {
    value: string,
    error?: string,
}

const ProductPopup = ({ category, product, onClose, onAdded }: IProps): JSX.Element => {
    const getDefaultColorData = (): IProductColorState => {
        return {
            id: +new Date(),
            color: colors.white,
            files: [],
        };
    };

    const [productColors, setProductColors] = React.useState<IProductColorState[]>([getDefaultColorData()]);
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [name, setName] = React.useState<IInputState>({ value: product?.name || '' });
    const [description, setDescription] = React.useState<IInputState>({ value: product?.description || '' });
    const [codeFromCompany, setCodeFromCompany] = React.useState<IInputState>({ value: product?.codeFromCompany || '' });
    const [priceFromCompany, setPriceFromCompany] = React.useState<IInputState>({ value: product?.priceFromCompany ? String(product.priceFromCompany) : '' });
    const [price, setPrice] = React.useState<IInputState>({ value: product?.price ? String(product.price) : '' });

    const validate = (): boolean => {
        let flag = true;
        if (!name.value) {
            setName(current => ({
                ...current,
                error: 'Vui lòng nhập tên sản phẩm',
            }));
            flag = false;
        }
        if (!description.value) {
            setDescription(current => ({
                ...current,
                error: 'Vui lòng nhập mô tả sản phẩm',
            }));
            flag = false;
        }
        if (!codeFromCompany.value) {
            setCodeFromCompany(current => ({
                ...current,
                error: 'Vui lòng mã sản phẩm',
            }));
            flag = false;
        }
        if (!priceFromCompany.value) {
            setPriceFromCompany(current => ({
                ...current,
                error: 'Vui lòng nhập giá gốc',
            }));
            flag = false;
        } else if (!numberRegex.test(priceFromCompany.value)) {
            setPriceFromCompany(current => ({
                ...current,
                error: 'Giá sai định dạng',
            }));
            flag = false;
        }
        if (!price.value) {
            setPrice(current => ({
                ...current,
                error: 'Vui lòng nhập giá bán',
            }));
            flag = false;
        } else if (!numberRegex.test(price.value)) {
            setPrice(current => ({
                ...current,
                error: 'Giá sai định dạng',
            }));
            flag = false;
        }

        return flag;
    };

    const handleUpdateProduct = async (): Promise<void> => {
        //
    };

    const handleAddProduct = async (): Promise<void> => {
        if (isProcessing || !productColors.length || !validate()) return;
        setIsProcessing(true);
        const cs: IColor[] = [];
        for (let i = 0; i < productColors.length; i++) {
            const imageUrls: string[] = [];
            const item = productColors[i];
            if (item.files?.length) {
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
        const newProductData = {
            name: name.value,
            description: description.value,
            codeFromCompany: codeFromCompany.value,
            price: Number(price.value),
            priceFromCompany: Number(priceFromCompany.value),
            rating: Math.round(getRandomNumber(3, 5)) / 5,
            buyersNumber: Math.round(getRandomNumber(50, 300)),
            colors: cs,
            categoryId: category.id,
            timestamp: +new Date(),
            code: '',
        };

        const id = await ProductService.instance.add(newProductData);
        setIsProcessing(false);
        if (id && onAdded) onAdded({ ...newProductData, id });
        if (onClose) onClose();
    };

    return (
        <PopupWrapper
            className={styles.container}
            onClose={onClose}
            title={{
                text: product ? 'Cập nhật thông tin sản phẩm' : `Thêm sản phẩm danh mục: ${category.name}`,
                icon: {
                    type: 'fa',
                    value: product ? 'fa fa-pen' : 'fa fa-plus'
                }
            }}
        >
            <h3 className={styles.title}>Thông tin cơ bản</h3>
            <Input
                required
                className={styles.input}
                label='Tên sản phẩm'
                initValue={product?.name}
                error={name.error}
                onValueChange={(value): void => {
                    setName({ value });
                }}
            />
            <Textbox
                required
                className={styles.input}
                label='Mô tả sản phẩm'
                initValue={product?.description}
                error={description.error}
                onValueChange={(value): void => {
                    setDescription({ value });
                }}
            />
            <Input
                required
                className={styles.input}
                label='Mã sản phẩm từ xưởng'
                initValue={product?.codeFromCompany}
                error={codeFromCompany.error}
                onValueChange={(value): void => {
                    setCodeFromCompany({ value });
                }}
            />
            <div className={styles.price}>
                <Input
                    required
                    className={styles.input}
                    label='Giá gốc (VND)'
                    initValue={product?.priceFromCompany}
                    error={priceFromCompany.error}
                    onValueChange={(value): void => {
                        setPriceFromCompany({ value });
                    }}
                />
                <Input
                    required
                    className={styles.input}
                    label='Giá bán (VND)'
                    initValue={product?.price}
                    error={price.error}
                    onValueChange={(value): void => {
                        setPrice({ value });
                    }}
                />
            </div>

            <div className={styles.colorGroup}>
                <div className={styles.head}>
                    <h3 className={styles.title}>Màu sắc và hình ảnh</h3>
                    <Button
                        icon={{
                            type: 'fa',
                            value: 'fa fa-plus',
                        }}
                        label='Thêm'
                        onClick={(): void => {
                            setProductColors(current => ([
                                ...current,
                                getDefaultColorData(),
                            ]));
                        }}
                    />
                </div>

                <div>
                    {
                        productColors.map(item =>
                            <ProductColor
                                key={item.id}
                                unremovable={productColors.length <= 1}
                                data={item.color}
                                onDelete={(): void => {
                                    setProductColors(current => current.filter(c => c.id !== item.id));
                                }}
                                onUpdate={(color, files): void => {
                                    setProductColors(current => current.map(c => c.id === item.id ? { ...c, color, files } : c));
                                }}
                            />
                        )
                    }
                </div>
            </div>

            <div className={styles.action}>
                <Button label='Hủy' onClick={onClose} />
                {
                    product
                        ? <Button primary label={isProcessing ? 'Đang tải...' : 'Cập nhật'} onClick={handleUpdateProduct} />
                        : <Button primary label={isProcessing ? 'Đang tải...' : 'Thêm'} onClick={handleAddProduct} />
                }
            </div>
        </PopupWrapper>
    );
};

export default ProductPopup;