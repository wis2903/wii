import React from 'react';
import Wrapper from '../../components/wrapper';
import Layout from '../../components/layout';
import ProductList from '../../modules/products-list';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
    return (
        <Layout className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <ProductList />
                <br />
            </Wrapper>
        </Layout>
    );
};

export default Home;