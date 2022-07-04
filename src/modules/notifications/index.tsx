import React from 'react';
import styles from './styles.module.scss';

const Notifications = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <span className={styles.empty}>Bạn chưa đặt đơn hàng nào</span>
        </div>
    );
};

export default Notifications;