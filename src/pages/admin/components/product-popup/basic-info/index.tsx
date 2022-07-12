import React from 'react';
import Input from '../../../../../components/basic/input';
import Textbox from '../../../../../components/basic/textbox';
import { numberRegex } from '../../../../../resources/constants/regex';
import styles from './styles.module.scss';

interface IProps {
    product?: IProduct,
    onChange?: (data: IProductBasicInfo) => void,
    validation?: (func: () => boolean) => void,
}
interface IProductBasicInfoState {
    name: IInputState,
    description: IInputState,
    codeFromCompany: IInputState,
    priceFromCompany: IInputState,
    price: IInputState,

}
interface IInputState {
    value: string,
    error?: string,
}

const ProductBasicInfo = ({ product, onChange, validation }: IProps): JSX.Element => {
    const [info, setInfo] = React.useState<IProductBasicInfoState>({
        name: { value: product?.name || '' },
        description: { value: product?.description || '' },
        codeFromCompany: { value: product?.codeFromCompany || '' },
        priceFromCompany: { value: product?.priceFromCompany ? String(product.priceFromCompany) : '' },
        price: { value: product?.price ? String(product.price) : '' },
    });

    const validate = (): boolean => {
        let flag = true;
        if (!info.name.value) {
            setInfo(current => ({
                ...current,
                name: {
                    ...current.name,
                    error: 'Vui lòng nhập tên sản phẩm'
                }
            }));
            flag = false;
        }
        if (!info.description.value) {
            setInfo(current => ({
                ...current,
                description: {
                    ...current.description,
                    error: 'Vui lòng nhập mô tả sản phẩm'
                }
            }));
            flag = false;
        }
        if (!info.codeFromCompany.value) {
            setInfo(current => ({
                ...current,
                codeFromCompany: {
                    ...current.codeFromCompany,
                    error: 'Vui lòng nhập mã sản phẩm'
                }
            }));
            flag = false;
        }
        if (!info.priceFromCompany.value) {
            setInfo(current => ({
                ...current,
                priceFromCompany: {
                    ...current.priceFromCompany,
                    error: 'Vui lòng nhập giá gốc'
                }
            }));
            flag = false;
        } else if (!numberRegex.test(info.priceFromCompany.value)) {
            setInfo(current => ({
                ...current,
                priceFromCompany: {
                    ...current.priceFromCompany,
                    error: 'Giá sai định dạng'
                }
            }));
            flag = false;
        }
        if (!info.price.value) {
            setInfo(current => ({
                ...current,
                price: {
                    ...current.price,
                    error: 'Vui lòng nhập giá gốc'
                }
            }));
            flag = false;
        } else if (!numberRegex.test(info.price.value)) {
            setInfo(current => ({
                ...current,
                price: {
                    ...current.price,
                    error: 'Giá sai định dạng'
                }
            }));
            flag = false;
        }

        return flag;
    };

    React.useEffect(() => {
        if (onChange) onChange({
            name: info.name.value,
            description: info.description.value,
            code: '',
            codeFromCompany: info.codeFromCompany.value,
            priceFromCompany: Number(info.priceFromCompany.value),
            price: Number(info.price.value),
        });
        if (validation) validation(validate);
    }, [info]);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Thông tin cơ bản về sản phẩm</h3>
            <Input
                required
                className={styles.input}
                error={info.name.error}
                label='Tên sản phẩm'
                initValue={product?.name}
                onValueChange={(value): void => {
                    setInfo(current => ({
                        ...current,
                        name: { value },
                    }));
                }}
            />
            <Textbox
                required
                className={styles.input}
                error={info.description.error}
                label='Mô tả sản phẩm'
                initValue={product?.description}
                onValueChange={(value): void => {
                    setInfo(current => ({
                        ...current,
                        description: { value },
                    }));
                }}
            />
            <Input
                required
                className={styles.input}
                error={info.codeFromCompany.error}
                label='Mã sản phẩm từ xưởng (Code)'
                initValue={product?.codeFromCompany}
                onValueChange={(value): void => {
                    setInfo(current => ({
                        ...current,
                        codeFromCompany: { value },
                    }));
                }}
            />
            <div className={styles.price}>
                <Input
                    required
                    className={styles.input}
                    error={info.priceFromCompany.error}
                    label='Giá gốc (VND)'
                    initValue={product?.priceFromCompany}
                    onValueChange={(value): void => {
                        setInfo(current => ({
                            ...current,
                            priceFromCompany: { value },
                        }));
                    }}
                />
                <Input
                    required
                    className={styles.input}
                    error={info.price.error}
                    label='Giá bán (VND)'
                    initValue={product?.price}
                    onValueChange={(value): void => {
                        setInfo(current => ({
                            ...current,
                            price: { value },
                        }));
                    }}
                />
            </div>
        </div>
    );
};

export default ProductBasicInfo;