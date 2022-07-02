import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import Button from '../../button';
import Price from '../../price';
import ProductWrapper from '../product-wrapper';
import Stars from '../../stars';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: IProduct,
}

const Product = ({ data, className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnailWrapper}>
                <ProductWrapper productId={data.id} className={styles.thumbnail} />
                <Button className={styles.cartButton} label='Thêm vào giỏ hàng' icon={{type: 'fa', value: 'fa fa-cart-shopping'}}/>
            </div>
            <div className={styles.info}>
                <ProductWrapper productId={data.id} className={styles.name}>{data.name}</ProductWrapper>
                <div className={styles.rating}>
                    <Stars rate={data.rating} />
                    <span className={styles.extra}>{data.buyersNumber} người mua</span>
                </div>
                <Price className={styles.price} value={data.price} />
            </div>
        </div>
    );
};

export default Product;