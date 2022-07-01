import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Price from '../price';
import ProductWrapper from '../product-wrapper';
import Stars from '../stars';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: IProduct,
}

const Product = ({ data, className }: IProps): JSX.Element => {
    return (
        <ProductWrapper productId={data.id} className={classname([styles.container, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <div className={styles.rating}>
                    <Stars rate={data.rating} />
                    <span className={styles.extra}>{data.buyersNumber} người mua</span>
                </div>
                <Price className={styles.price} value={data.price} />
            </div>
        </ProductWrapper>
    );
};

export default Product;