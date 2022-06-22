import React from 'react';
import { classname, formatNumber } from '../../helpers/utils.helper';
import Button from '../button';
import Stars from '../stars';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    reference?: React.LegacyRef<HTMLDivElement>,
    title: string,
    data: IProduct,
}

const TopRankingProduct = ({ className, title, data, reference }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])} ref={reference}>
            <div className={styles.mainContent}>
                <div className={styles.left}>
                    <h3 className={styles.label}>{title}</h3>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.rating}>
                        <Stars rate={4 / 5} />
                        <span className={styles.extra}>52 người mua</span>
                    </div>
                    <div className={styles.price}>
                        <div>
                            <span className={styles.linethrough}>{formatNumber(data.price * 1.2)} đ</span>
                            <span className={styles.discount}>-20%</span>
                        </div>
                        {formatNumber(data.price)} đ
                    </div>
                    <Button label='Mua ngay' primary />
                </div>

                <div className={styles.right}>
                    <div className={styles.thumbnail} />
                </div>
            </div>
        </div>
    );
};

export default TopRankingProduct;