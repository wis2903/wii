import React from 'react';
import Input from '../../../components/basic/input';
import Textbox from '../../../components/basic/textbox';
import styles from './styles.module.scss';

const ShippingInfo = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Input className={styles.input} label='Tên người nhận' />
            <Input className={styles.input} label='Số điện thoại người nhận' />
            <Input className={styles.input} label='Email người nhận' />
            <Textbox className={styles.input} label='Địa chỉ người nhận' />
        </div>
    );
};

export default ShippingInfo;