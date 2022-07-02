import React from 'react';
import Slide from '../../slide';
import ProductSlide from './slide';
import styles from './styles.module.scss';

const ProductPreview = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.preview} />
            <Slide className={styles.slide} items={[
                <ProductSlide key={1} />,
                <ProductSlide key={2} />
            ]} />
        </div>
    );
};

export default ProductPreview;