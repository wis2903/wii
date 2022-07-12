import React from 'react';
import { IProductColorState } from '..';
import { colors } from '../../../../../resources/constants/color';
import Button from '../../../../../components/basic/button';
import ProductColor from './item';
import styles from './styles.module.scss';

interface IProps {
    product?: IProduct,
    onChange?: (data: IProductColorState[]) => void,
}

const ProductColorsAndImages = ({ product, onChange }: IProps): JSX.Element => {
    const getDefaultColorData = (): IProductColorState => {
        return {
            id: +new Date(),
            color: colors.white,
            files: [],
        };
    };
    const getExistedColorData = (): IProductColorState[] => {
        if (product && product.colors) {
            return product.colors.map(item => ({
                id: `${item.value}-${+new Date()}`,
                color: item,
            }));
        }

        return [getDefaultColorData()];
    };
    const [productColors, setProductColors] = React.useState<IProductColorState[]>(getExistedColorData());

    React.useEffect(() => {
        if (onChange) onChange(productColors.filter(item => item.color.images?.length || item.files?.length));
    }, [productColors]);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h3 className={styles.title}>Màu sắc và hình ảnh</h3>
                <Button
                    icon={{
                        type: 'fa',
                        value: 'fa fa-plus',
                    }}
                    label='Thêm'
                    tabIndex={-1}
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
    );
};

export default ProductColorsAndImages;