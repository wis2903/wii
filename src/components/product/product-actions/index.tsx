import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import AmountPicker from '../../amount-picker';
import Button from '../../basic/button';
import Price from '../../price';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const ProductActions = ({ className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.head}>
                <h3 className={styles.label}>Đặt hàng</h3>
                <div className={styles.shipping}>Miễn phí ship toàn quốc</div>
            </div>

            <div className={styles.amountWrapper}>
                <AmountPicker className={styles.amountPicker} defaultValue={1} />
                <Price className={styles.price} value={199000} />
            </div>

            <div className={styles.buttons}>
                <Button primary label='Thêm vào giỏ hàng' />
                <Button primary label='Mua ngay' />
            </div>

            <div className={styles.payment}>Hỗ trợ thanh toán khi nhận hàng, cho phép kiểm tra hàng trước khi thanh toán.</div>
        </div>
    );
};

export default ProductActions;