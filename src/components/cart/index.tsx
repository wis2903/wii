import React from 'react';
import styles from './styles.module.scss';

const Cart = (): JSX.Element => {
    return (
        <button className={styles.container}>
            <span className={styles.icon}>
                <span className='fa fa-cart-shopping' />
                <span className={styles.indicator}>0</span>
            </span>
            <span className={styles.label}>Giỏ hàng</span>
        </button>
    );
};

export default Cart;