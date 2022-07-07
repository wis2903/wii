import React from 'react';
import { classname, formatNumber } from '../../helpers/utils.helper';
import CartItem from '../cart-item';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    cartItems: ICartItem[],
    disabledUpdateCartItem?: boolean,
    onCartItemAmountChange?: (productId: IObjectId, color: string, amount: number) => void,
    onRemoveCartItem?: (cartItem: ICartItem) => void,
}

const PaymentSummary = ({ className, cartItems, disabledUpdateCartItem, onCartItemAmountChange, onRemoveCartItem }: IProps): JSX.Element => {
    const getTotalMoney = (): number => {
        let res = 0;
        cartItems.forEach(item => {
            res += item.product.price * item.amount;
        });
        return res;
    };
    const totalMoney = getTotalMoney();

    return (
        <div className={classname([styles.container, className])}>
            <h3 className={styles.title}>Chi tiết đơn hàng ({cartItems.length})</h3>
            {
                !cartItems.length
                ? <div className={styles.empty}>Bạn chưa lựa chọn sản phẩm nào</div>
                : cartItems.map(item =>
                    <CartItem
                        key={`${item.product.id}-${item.color.value}`}
                        data={item}
                        disabled={disabledUpdateCartItem}
                        onAmountChange={(amount): void => {
                            if (onCartItemAmountChange) onCartItemAmountChange(item.product.id, item.color.value, amount);
                        }}
                        onRemove={(): void => {
                            if (onRemoveCartItem) onRemoveCartItem(item);
                        }}
                    />
                )
            }
            <br />
            <br />
            <h3 className={styles.title}>Tóm tắt đơn hàng</h3>

            <div className={styles.item}>
                <span className={styles.label}>Hình thức thanh toán:</span>
                <span className={styles.value}>Thanh toán tiền mặt khi nhận hàng</span>
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
    );
};

export default PaymentSummary;