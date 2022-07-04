import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { classname } from '../../helpers/utils.helper';
import CartItem from '../../components/cart-item';
import styles from './styles.module.scss';
import Button from '../../components/basic/button';
import PaymentService from '../../services/payment.service';
import CartService from '../../services/cart.service';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
}

const Cart = ({ className, onClose }: IProps): JSX.Element => {
    const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);

    const handleOnShowPaymentPopup = (): void => {
        if (onClose) onClose();
    };

    const updateCartItems = async (): Promise<void> => {
        CartService.instance.list().then(res => {
            setCartItems(res);
        });
    };

    React.useEffect(() => {
        updateCartItems();
        PaymentService.instance.addRequestShowPopupListener(handleOnShowPaymentPopup);
        CartService.instance.addProductsUpdatedListener(updateCartItems);

        return (): void => {
            PaymentService.instance.removeRequestShowPopupListener(handleOnShowPaymentPopup);
            CartService.instance.removeProductsUpdatedListener(updateCartItems);
        };
    }, []);


    return (
        <PopupWrapper
            className={classname([styles.container, className])}
            title={{ text: `Giỏ hàng của bạn (${cartItems.length})`, icon: { type: 'fa', value: 'fa fa-cart-shopping' } }}
            onClose={onClose}
        >
            {
                !cartItems.length
                &&
                <div className={styles.empty}>Giỏ hàng của bạn chưa có sản phẩm nào.</div>
            }

            {
                cartItems.map(item =>
                    <CartItem
                        key={`${item.product.id}-${item.color}`}
                        data={item}
                    />
                )
            }

            {
                !!cartItems.length
                &&
                <div className={styles.action}>
                    <Button label='Xác nhận đặt hàng' primary onClick={(): void => {
                        PaymentService.instance.requestShowPoup();
                    }} />
                </div>
            }
        </PopupWrapper>
    );
};

export default Cart;