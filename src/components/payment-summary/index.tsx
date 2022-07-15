import React from 'react';
import { classname, formatNumber } from '../../helpers/utils.helper';
import CartItems from '../cart-items';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    cartItems: ICartItem[],
    disabledUpdateCartItem?: boolean,
    onCartItemAmountChange?: (productId: IObjectId, color: string, amount: number) => void,
    onRemoveCartItem?: (cartItem: ICartItem) => void,
}

const PaymentSummary = ({ className, cartItems, disabledUpdateCartItem, onCartItemAmountChange, onRemoveCartItem }: IProps): JSX.Element => {
    const [products, setProducts] = React.useState<IProduct[]>([]);

    const getTotalMoney = (): number => {
        let res = 0;
        cartItems.forEach(item => {
            const prd = products.find(p => p.id === item.productId);
            res += (prd?.price || 0) * item.amount;
        });
        return res;
    };
    const totalMoney = getTotalMoney();

    return (
        <div className={classname([styles.container, className])}>
            <h3 className={styles.title}>Chi tiết sản phẩm</h3>
            <div className={styles.cartIems}>
                {
                    !cartItems.length
                        ? <div className={styles.empty}>Bạn chưa lựa chọn sản phẩm nào</div>
                        : <CartItems
                            disabledUpdateCartItem
                            itemClassName={styles.cartItem}
                            data={cartItems}
                            onProductsLoaded={(prds): void => {
                                setProducts(prds);
                            }}
                            onRemove={(item): void => {
                                if (onRemoveCartItem) onRemoveCartItem(item);
                            }}
                            onUpdateAmount={(item, amount): void => {
                                if (onCartItemAmountChange) onCartItemAmountChange(item.productId, item.color.value, amount);
                            }}
                        />
                }
            </div>

            <h3 className={styles.title}>Tóm tắt đơn hàng</h3>
            <div className={styles.item}>
                <span className={styles.label}>Hình thức thanh toán:</span>
                <span className={classname([styles.value])}>Thanh toán tiền mặt khi nhận hàng</span>
            </div>

            <div className={styles.item}>
                <span className={styles.label}>Giá trị tổng sản phẩm:</span>
                <span className={styles.value}>{formatNumber(totalMoney)} VND</span>
            </div>

            <div className={styles.item}>
                <span className={styles.label}>Phí vận chuyển:</span>
                <span className={classname([styles.value, styles.highlight])}>Miễn phí</span>
            </div>

            <div className={styles.item}>
                <span className={styles.label}>Tổng giá trị:</span>
                <span className={styles.value}>{formatNumber(totalMoney)} VND</span>
            </div>
        </div>
    );
};

export default PaymentSummary;