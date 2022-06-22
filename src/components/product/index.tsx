import React from 'react';
import { classname, formatNumber } from '../../helpers/utils.helper';
import Stars from '../stars';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: IProduct,
}

const Product = ({ data, className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <h3 className={styles.name}>{data.name}</h3>
                <div className={styles.rating}>
                    <Stars rate={3 / 5} />
                    <span className={styles.extra}>52 người mua</span>
                </div>
                <div className={styles.price}>
                    <div>
                        <span className={styles.linethrough}>
                            {formatNumber(data.price * 1.2)} đ
                        </span>
                        <span className={styles.discount}>-20%</span>
                    </div>
                    {formatNumber(data.price)} đ
                </div>
            </div>
        </div>
    );
};

export default Product;