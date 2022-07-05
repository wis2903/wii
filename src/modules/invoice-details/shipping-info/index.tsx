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
            <Input className={styles.input} label='Tên người nhận' defaultValue={name} disabled />
            <Input className={styles.input} label='Số điện thoại người nhận' defaultValue={phoneNumber} disabled />
            <Input className={styles.input} label='Email người nhận' defaultValue={email} disabled />
            <Textbox className={styles.input} label='Địa chỉ người nhận' defaultValue={address} disabled />
            <Input className={styles.input} label='Thời điểm đặt hàng' defaultValue={time} disabled />
        </div>
    );
};

export default ShippingInfo;