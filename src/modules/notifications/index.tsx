import React from 'react';
import { disableScroll, enableScroll } from '../../helpers/dom.helpers';
import styles from './styles.module.scss';

const Notifications = (): JSX.Element => {
    React.useEffect(() => {
        disableScroll();

        return (): void => {
            enableScroll();
        };
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.empty}>Bạn chưa đặt đơn hàng nào</span>
        </div>
    );
};

export default Notifications;