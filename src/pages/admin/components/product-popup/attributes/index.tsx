import React from 'react';
import Button from '../../../../../components/basic/button';
import ProductAttribute from './item';
import styles from './styles.module.scss';

interface IProps {
    product?: IProduct,
    disabled?: boolean,
    onChange?: (data: IProductAttribute[]) => void,
    validation?: (func: () => boolean) => void,
}
interface IProductAttributeState extends IProductAttribute {
    required?: boolean,
    validation?: () => boolean,
    removed?: boolean,
}

const ProductAttributes = ({ product, disabled, onChange, validation }: IProps): JSX.Element => {
    const getDefaultAttributesFromProduct = (): IProductAttributeState[] => {
        const res: IProductAttributeState[] = [
            {
                key: 'Nguồn gốc xuất xứ',
                value: '',
                required: true,
            },
            {
                key: 'Chất liệu',
                value: '',
                required: true,
            },
            {
                key: 'Kích thước',
                value: '',
                required: true,
            },
        ];
        if (!product || !product.attributes) return res;

        product.attributes.forEach(item => {
            if (
                item.key === 'Nguồn gốc xuất xứ'
                || item.key === 'Chất liệu'
                || item.key === 'Kích thước'
            ) {
                const attr = res.find(c => c.key === item.key);
                if (attr) attr.value = item.value;
            } else {
                res.push({
                    key: item.key,
                    value: item.value,
                });
            }
        });

        return res;
    };

    const [toggle, setToggle] = React.useState<boolean>(false);
    const attributes = React.useRef<IProductAttributeState[]>(getDefaultAttributesFromProduct());

    const validate = (): boolean => {
        let flag = true;
        attributes.current.forEach(item => {
            if (item.required && item.validation && !item.validation()) {
                flag = false;
            }
        });
        return flag;
    };

    const handleOnChange = (): void => {
        if (onChange) onChange(
            [...attributes.current].filter(item => item.key && item.value && !item.removed)
                .map(item => ({
                    key: item.key,
                    value: item.value,
                }))
        );
        if (validation) validation(validate);
    };

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h3 className={styles.title}>Thuộc tính sản phẩm</h3>
                {
                    !disabled
                    &&
                    <Button
                        icon={{
                            type: 'fa',
                            value: 'fa fa-plus',
                        }}
                        tabIndex={-1}
                        label='Thêm'
                        onClick={(): void => {
                            attributes.current.push({
                                key: '',
                                value: '',
                            });
                            setToggle(!toggle);
                        }}
                    />
                }
            </div>
            <div>
                {
                    attributes.current.map((item, i) =>
                        <ProductAttribute
                            key={`product-attr-${i}`}
                            disabled={disabled}
                            required={item.required}
                            title={item.key}
                            initValue={item.value}
                            hidden={item.removed}
                            onChange={(key, value, valid): void => {
                                attributes.current = [...attributes.current].map((item, ix) => {
                                    if (ix === i) return { ...item, key, value, validation: valid };
                                    else return item;
                                });
                                handleOnChange();
                            }}
                            onDelete={(): void => {
                                attributes.current = [...attributes.current].map((item, ix) => {
                                    if (ix === i) return { ...item, removed: true };
                                    else return item;
                                });
                                handleOnChange();
                                setToggle(!toggle);
                            }}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default ProductAttributes;