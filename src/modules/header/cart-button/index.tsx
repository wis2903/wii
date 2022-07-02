import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClick?: () => void,
}

const Cart = ({ className, onClick }: IProps): JSX.Element => {
    return (
        <button className={classname([styles.container, className])} onClick={onClick}>
            <span className={styles.icon}>
                <span className='fa fa-cart-shopping' />
                <span className={styles.indicator}>0</span>
            </span>
            <span className={styles.label}>Giỏ hàng</span>
        </button>
    );
};

export default Cart;