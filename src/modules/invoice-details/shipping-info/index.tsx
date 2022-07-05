import React from 'react';
import Input from '../../../components/basic/input';
import Textbox from '../../../components/basic/textbox';
import styles from './styles.module.scss';

interface IProps {
    name: string,
    email: string,
    phoneNumber: string,
    time: string,
    address: string,
}

const ShippingInfo = ({ name, email, address, time, phoneNumber }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Thông tin người nhận hàng</h3>
            <Input className={styles.input} label='Tên người nhận' initValue={name} disabled />
            <Input className={styles.input} label='Số điện thoại người nhận' initValue={phoneNumber} disabled />
            <Input className={styles.input} label='Email người nhận' initValue={email} disabled />
            <Textbox className={styles.input} label='Địa chỉ người nhận' initValue={address} disabled />
            <Input className={styles.input} label='Thời điểm đặt hàng' initValue={time} disabled />
        </div>
    );
};

export default ShippingInfo;