import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import styles from './styles.module.scss';
import Button from '../../components/basic/button';
import CartService from '../../services/cart.service';
import EventService from '../../services/event.service';
import CartItems from '../../components/cart-items';
import { classname } from '../../helpers/utils.helper';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
}

const Cart = ({ className, onClose }: IProps): JSX.Element => {
    const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);

    const handleCloseShoppingCart = (): void => {
        if (onClose) onClose();
    };
    const handleShowPayment = (): void => {
        EventService.instance.onRequestShowPayment.trigger(cartItems);
    };
    const updateCartItems = async (): Promise<void> => {
        CartService.instance.list().then(res => {
            setCartItems(res);
        });
    };
    const handleOnShoppingCartItemsUpdated = (): void => {
        updateCartItems();
    };

    React.useEffect(() => {
        updateCartItems();
        EventService.instance.onRequestShowPayment.addEventListener(handleCloseShoppingCart);
        EventService.instance.onShoppingCartItemsUpdated.addEventListener(handleOnShoppingCartItemsUpdated);

        return (): void => {
            EventService.instance.onRequestShowPayment.removeEventListener(handleCloseShoppingCart);
            EventService.instance.onShoppingCartItemsUpdated.removeEventListener(handleOnShoppingCartItemsUpdated);
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
                ? <div className={styles.empty}>Giỏ hàng của bạn chưa có sản phẩm nào.</div>
                : <CartItems data={cartItems} />
            }

            {
                !!cartItems.length
                &&
                <div className={styles.action}>
                    <Button label='Xác nhận đặt hàng' primary onClick={handleShowPayment} />
                </div>
            }
        </PopupWrapper>
    );
};

export default Cart;