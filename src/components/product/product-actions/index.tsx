import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import CartService from '../../../services/cart.service';
import PaymentService from '../../../services/payment.service';
import AmountPicker from '../../amount-picker';
import Button from '../../basic/button';
import ColorPicker from '../../color-picker';
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
                <div className={styles.shipping}>Miễn phí vận chuyển toàn quốc</div>
                <div className={styles.shipping}>Thanh toán khi nhận hàng</div>
            </div>

            <div className={styles.colorWrapper}>
                <h4 className={styles.catLabel}>Màu sắc sản phẩm: Trắng</h4>
                <ColorPicker colors={[
                    {
                        label: 'Đen',
                        value: 'black',
                    },
                    {
                        label: 'Trắng',
                        value: '#ffffff',
                    },
                    {
                        label: 'Cam',
                        value: 'orange',
                    },
                    {
                        label: 'Vàng',
                        value: 'yellow',
                    },
                    {
                        label: 'Xám',
                        value: 'grey',
                    },
                ]} />
            </div>

            <h4 className={styles.catLabel}>Số lượng sản phẩm</h4>
            <div className={styles.amountWrapper}>
                <AmountPicker className={styles.amountPicker} defaultValue={1} />
                <Price className={styles.price} value={199000} />
            </div>

            <div className={styles.buttons}>
                <Button primary label='Thêm vào giỏ hàng' onClick={(): void => {
                    CartService.instance.requestShowCartNotification();
                }}/>
                <Button primary label='Mua ngay' onClick={(): void => {
                    PaymentService.instance.requestShowPoup();
                }} />
            </div>
        </div>
    );
};

export default ProductActions;