import React from 'react';
import Button from '../../components/basic/button';
import CartItem from '../../components/cart-item';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { formatNumber } from '../../helpers/utils.helper';
import CartService from '../../services/cart.service';
import NotificationService from '../../services/notification.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
    items: ICartItem[],
}

const Payment = ({ onClose, className, items }: IProps): JSX.Element => {
    const [finalItems, setFinalItems] = React.useState<ICartItem[]>(items);

    const handleOnAmountChange = (productId: IObjectId, color: string, amount: number): void => {
        const tmp = [...finalItems];
        const itm = tmp.find(item => item.product.id === productId && item.color.value === color);
        if (itm) itm.amount = amount;
        setFinalItems(tmp);
    };

    const getTotalMoney = (): number => {
        let res = 0;
        finalItems.forEach(item => {
            res += item.product.price * item.amount;
        });
        return res;
    };

    const handlePayment = async (): Promise<void> => {
        await CartService.instance.removeMultipleItems(finalItems.map(item => ({
            productId: item.product.id,
            color: item.color.value,
        })));
        if (onClose) onClose();
        NotificationService.instance.requestShowNotification();
    };

    React.useEffect(() => {
        setFinalItems(items);
    }, [items]);

    const totalMoney = getTotalMoney();

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
                    <h3 className={styles.title}>Chi tiết đơn hàng ({items.length})</h3>
                    {
                        finalItems.map(item =>
                            <CartItem
                                key={`${item.product.id}-${item.color.value}`}
                                data={item}
                                onAmountChange={(amount): void => {
                                    handleOnAmountChange(item.product.id, item.color.value, amount);
                                }}
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
                    <ShippingInfo />
                    <div className={styles.action}>
                        <Button primary label='Tiến hành đặt hàng' onClick={handlePayment} />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default Payment;