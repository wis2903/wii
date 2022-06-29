import React from 'react';
import Wrapper from '../../components/wrapper';
import Layout from '../../components/layout';
import MostPopular from '../../modules/most-popular-list';
import ProductList from '../../modules/products-list';
import TopRankingProductList from '../../modules/top-ranking-products-list';
import Ads from '../../modules/ads';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
    return (
        <Layout className={styles.container}>
            <Wrapper>
                <Ads />
                <br />
                <br />
                <br />
                <MostPopular title='Sản phẩm giảm giá'/>
                <br />
                <br />
                <TopRankingProductList />
                <br />
                <br />
                <br />
                <br />
                <ProductList
                    products={Array.from({ length: 24 }).map((item, i) => ({
                        id: String(i),
                        name: 'Túi Handbag cầm tay đơn giản',
                        price: 199000
                    }))}
                />
                <br />
                <br />
                <br />
                <MostPopular title='Có thể bạn quan tâm'/>
            </Wrapper>
        </Layout>
    );
};

export default Home;