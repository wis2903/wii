import React from 'react';
import TopRankingProduct from '../../components/product/top-ranking-product';
import styles from './styles.module.scss';

const TopRankingProductList = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <TopRankingProduct
                title='Bán chạy nhất tuần qua'
                data={{
                    id: 'abc',
                    name: 'Túi Handbag cầm tay đơn giản',
                    price: 199000,
                    categoryId: '',
                    buyersNumber: 10,
                    rating: 4 / 5,
                    imageUrls: [],
                }}
            />
            <br />
            <br />
            <TopRankingProduct
                title='Giảm giá nhiều nhất'
                data={{
                    id: 'abc',
                    name: 'Túi Handbag cầm tay đơn giản',
                    price: 199000,
                    categoryId: '',
                    buyersNumber: 10,
                    rating: 4 / 5,
                    imageUrls: [],
                }}
            />
        </div>
    );
};

export default TopRankingProductList;