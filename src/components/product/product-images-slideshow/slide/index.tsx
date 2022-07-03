import React from 'react';
import Button from '../../../basic/button';
import styles from './styles.module.scss';

const ProductSlide = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Button className={styles.item} label=""/>
            <Button className={styles.item} label=""/>
            <Button className={styles.item} label=""/>
            <Button className={styles.item} label=""/>
            <Button className={styles.item} label=""/>
        </div>
    );
};

export default ProductSlide;