import React from 'react';
import Button from '../../components/basic/button';
import CartItem from '../../components/cart-item';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { formatNumber } from '../../helpers/utils.helper';
import NotificationService from '../../services/notification.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
}

const Payment = ({ onClose, className }: IProps): JSX.Element => {
    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            title={{
                text: 'Xác nhận thông tin đặt hàng',
                icon: {
                    type: 'fa',
                    value: 'fa fa-truck',
                }
            }}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Chi tiết đơn hàng (2)</h3>
                    <CartItem
                        className={styles.cartItem}
                        smallProductTitle
                        productData={{
                            id: String(Math.random()),
                            name: 'Túi Handbag cầm tay đơn giản',
                            price: 199000,
                            categoryId: '',
                            buyersNumber: 10,
                            rating: 4 / 5,
                            imageUrls: [],
                        }}
                        defaultAmount={1}
                    />
                    <CartItem
                        className={styles.cartItem}
                        smallProductTitle
                        productData={{
                            id: String(Math.random()),
                            name: 'Túi Handbag cầm tay đơn giản',
                            price: 199000,
                            categoryId: '',
                            buyersNumber: 10,
                            rating: 4 / 5,
                            imageUrls: [],
                        }}
                        defaultAmount={1}
                    />
                    <br />
                    <br />
                    <div>
                        <h3 className={styles.title}>Tóm tắt đơn hàng</h3>

                        <div className={styles.item}>
                            <span className={styles.label}>Hình thức thanh toán:</span>
                            <span className={styles.value}>Tiền mặt khi nhận hàng</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Giá trị tổng sản phẩm:</span>
                            <span className={styles.value}>{formatNumber(199000 * 2)} VND</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Phí vận chuyển:</span>
                            <span className={styles.value}>Miễn phí</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Tổng giá trị:</span>
                            <span className={styles.value}>{formatNumber(199000 * 2)} VND</span>
                        </div>
                    </div>
                    <br />
                </div>

                <div className={styles.right}>
                    <h3 className={styles.title}>Thông tin người nhận hàng</h3>
                    <ShippingInfo />
                    <div className={styles.action}>
                        <Button primary label='Tiến hành đặt hàng' onClick={(): void => {
                            if(onClose) onClose();
                            NotificationService.instance.requestShowNotification();
                        }} />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default Payment;