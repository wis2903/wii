import React from 'react';
import TopRankingProduct from '../../components/top-ranking-product';
import styles from './styles.module.scss';

const TopRankingProductList = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <TopRankingProduct
                title='Bán chạy nhất tuần qua'
                data={{
                    id: 'abc',
                    name: 'Túi Handbag cầm tay đơn giản nữ tính',
                    price: 199000
                }}
            />
            <br />
            <br />
            <TopRankingProduct
                title='Giảm giá nhiều nhất'
                data={{
                    id: 'abc',
                    name: 'Túi Handbag cầm tay đơn giản nữ tính',
                    price: 199000
                }}
            />
        </div>
    );
};

export default TopRankingProductList;