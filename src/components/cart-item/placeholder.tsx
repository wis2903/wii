import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const CartItemPlaceholder = ({ className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.placeholder, className])}>
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