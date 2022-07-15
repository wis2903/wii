import React from 'react';
import Button from '../../../../../../components/basic/button';
import Tooltip from '../../../../../../components/basic/tooltip';
import ProductPopup from '../../../../components/product-popup';
import styles from './styles.module.scss';

interface IProps {
    product: IProduct,
    color: IColor,
    amount: number,
}

const SummaryItem = ({ product, color, amount }: IProps): JSX.Element => {
    const [isShowProductDetails, setIsShowProductDetails] = React.useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.code}>
                        <span>Mã sản phẩm: {product.timestamp}</span>
                    </div>
                    <Tooltip text={product.name}>
                        <div className={styles.name}>
                            Tên sản phẩm: <span className={styles.value}>{product.name}</span>
                        </div>
                    </Tooltip>
                    <div className={styles.description}>
                        Mã tại xưởng: <span>{product.codeFromCompany}</span>
                    </div>
                    <div className={styles.color}>
                        Màu sắc: <span>{color.label}</span>
                    </div>
                    <div className={styles.amount}>
                        Số lượng: <span>{amount}</span>
                    </div>
                </div>

                <div className={styles.action}>
                    <Button label='Chi tiết' onClick={(): void => {
                        setIsShowProductDetails(true);
                    }} />
                </div>
            </div>

            {
                isShowProductDetails
                && <ProductPopup
                    disabled
                    category={{} as ICategory}
                    product={product}
                    onClose={(): void => {
                        setIsShowProductDetails(false);
                    }}
                />
            }
        </>
    );
};

export default SummaryItem;