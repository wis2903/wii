import React from 'react';
import styles from './styles.module.scss';

const CartItemPlaceholder = (): JSX.Element => {
    return (
        <div className={styles.placeholder}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <div>
                    <div className={styles.name} />
                    <div className={styles.color} />
                </div>
                <div className={styles.amount} />
            </div>
        </div>
    );
};

export default CartItemPlaceholder;