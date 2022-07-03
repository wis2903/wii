import React from 'react';
import Input from '../../../components/basic/input';
import Textbox from '../../../components/basic/textbox';
import styles from './styles.module.scss';

const ShippingInfo = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Input className={styles.input} label='Tên người nhận' required />
            <Input className={styles.input} label='Số điện thoại người nhận' required />
            <Input className={styles.input} label='Email người nhận' required />
            <Textbox className={styles.input} label='Địa chỉ người nhận' required />
        </div>
    );
};

export default ShippingInfo;