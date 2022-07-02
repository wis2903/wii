import React from 'react';
import BestSellerProduct from '../../components/product/popular-product';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    products: IProduct[],
    disableShadow?: boolean,
}

const BestSellerList = ({ className, products, disableShadow }: IProps): JSX.Element => {
    return (
        <div className={classname([className, styles.container])}>
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