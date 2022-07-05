import React from 'react';
import styles from './styles.module.scss';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Payment from '../payment';
import PaymentService from '../../services/payment.service';
import Cart from '../cart';
import CartService from '../../services/cart.service';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}
interface IPaymentPopupState {
    isShown: boolean,
    items: ICartItem[],
}

const Layout = ({ children, className, ...rest }: IProps): JSX.Element => {
    const [paymentPopup, setPaymentPopup] = React.useState<IPaymentPopupState>({ isShown: false, items: [] });
    const [isShowCartPopup, setIsShowCartPopup] = React.useState<boolean>(false);

    const handleOnRequestShowPaymentPopup = (items?: ICartItem[]): void => {
        setPaymentPopup({
            isShown: true,
            items: items || [],
        });
    };
    const handleOnRequestShowCartPopup = (): void => {
        setIsShowCartPopup(true);
    };

    React.useEffect(() => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });

        PaymentService.instance.addRequestShowPopupListener(handleOnRequestShowPaymentPopup);
        CartService.instance.addRequestShowPopupListener(handleOnRequestShowCartPopup);

        return (): void => {
            PaymentService.instance.removeRequestShowPopupListener(handleOnRequestShowPaymentPopup);
            CartService.instance.removeRequestShowPopupListener(handleOnRequestShowCartPopup);
        };
    }, []);

    return (
        <>
            <div className={classname([className, styles.container, 'layout'])} {...rest}>
                {children}
            </div>
            {
                paymentPopup.isShown
                &&
                <Payment items={paymentPopup.items} onClose={(): void => {
                    setPaymentPopup({ isShown: false, items: [] });
                }} />
            }
            {
                isShowCartPopup
                &&
                <Cart onClose={(): void => {
                    setIsShowCartPopup(false);
                }} />
            }
        </>
    );
};

export default Layout;