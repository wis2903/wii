import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { classname } from '../../helpers/utils.helper';
import CartItem from '../../components/cart-item';
import styles from './styles.module.scss';
import Button from '../../components/basic/button';
import PaymentService from '../../services/payment.service';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
}

const Cart = ({ className, onClose }: IProps): JSX.Element => {
    const handleOnShowPaymentPopup = (): void => {
        if (onClose) onClose();
    };

    React.useEffect(() => {
        PaymentService.instance.addRequestShowPopupListener(handleOnShowPaymentPopup);

        return (): void => {
            PaymentService.instance.removeRequestShowPopupListener(handleOnShowPaymentPopup);
        };
    }, []);


    return (
        <PopupWrapper
            className={classname([styles.container, className])}
            title={{ text: `Giỏ hàng của bạn (${2})`, icon: { type: 'fa', value: 'fa fa-cart-shopping' } }}
            onClose={onClose}
        >
            <CartItem
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

            <div className={styles.action}>
                <Button label='Xác nhận đặt hàng' primary onClick={(): void => {
                    PaymentService.instance.requestShowPoup();
                }} />
            </div>
        </PopupWrapper>
    );
};

export default Cart;