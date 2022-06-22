import React from 'react';
import { classname } from '../../helpers/utils.helper';
import BestSellerProduct from '../best-seller-product';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    products: IProduct[],
    disableTitle?: boolean,
    disableShadow?: boolean,
}

const BestSellerList = ({ className, products, disableTitle, disableShadow }: IProps): JSX.Element => {
    return (
        <div className={classname([className, styles.container])}>
            {
                !disableTitle
                &&
                <h3 className={styles.label}>Sản phẩm bán chạy</h3>
            }
            <div className={styles.list}>
                {
                    products.map(item =>
                        <BestSellerProduct
                            disableShadow={disableShadow}
                            key={item.id}
                            data={item}
                            className={styles.product}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default BestSellerList;