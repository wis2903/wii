import moment from 'moment';
import React from 'react';
import Button from '../../components/basic/button';
import CartItem from '../../components/cart-item';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { formatNumber } from '../../helpers/utils.helper';
import InvoiceService from '../../services/invoice.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
    data: IInvoiceItem,
}

const InvoiceDetails = ({ onClose, className, data }: IProps): JSX.Element => {
    const getTotalMoney = (): number => {
        let res = 0;
        data.items.forEach(item => {
            res += item.product.price * item.amount;
        });
        return res;
    };
    const handleDeleteInvoice = (): void => {
        InvoiceService.instance.remove(data.timestamp);
        if (onClose) onClose();
    };

    const totalMoney = getTotalMoney();

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            title={{
                text: 'Thông tin đơn hàng đã đặt',
                icon: {
                    type: 'fa',
                    value: 'fa fa-money-check',
                }
            }}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Chi tiết đơn hàng ({data.items.length})</h3>
                    {
                        data.items.map(item =>
                            <CartItem
                                key={`${item.product.id}-${item.color.value}`}
                                data={item}
                                disabled
                            />
                        )
                    }
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
                            <span className={styles.value}>{formatNumber(totalMoney)} VND</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Phí vận chuyển:</span>
                            <span className={styles.value}>Miễn phí</span>
                        </div>

                        <div className={styles.item}>
                            <span className={styles.label}>Tổng giá trị:</span>
                            <span className={styles.value}>{formatNumber(totalMoney)} VND</span>
                        </div>
                    </div>
                    <br />
                </div>

                <div className={styles.right}>
                    <h3 className={styles.title}>Thông tin người nhận hàng</h3>
                    <ShippingInfo {...{
                        ...data.buyer,
                        time: moment(data.timestamp).format('DD/MM/YYYY, HH:mm')
                    }} />
                    <div className={styles.action}>
                        <Button label='Xóa đơn hàng' onClick={handleDeleteInvoice} />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default InvoiceDetails;