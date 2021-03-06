import React from 'react';
import Wrapper from '../../components/basic/wrapper';
import Layout from '../../modules/layout';
import ProductList from '../../modules/products-list';
import styles from './styles.module.scss';

const HomePage = (): JSX.Element => {
    return (
        <Layout className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <ProductList />
                <br />
            </Wrapper>
        </Layout>
    );
};

export default HomePage;