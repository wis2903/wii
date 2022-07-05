import React from 'react';
import styles from './styles.module.scss';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Payment from '../payment';
import Cart from '../cart';
import ProductDetails from '../product-details';
import EventService from '../../services/event.service';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}
interface IPaymentPopupState {
    isShown: boolean,
    items?: ICartItem[],
}
interface IProductDetailsState {
    isShown: boolean,
    product?: IProduct,
}
interface IShoppingCartState {
    isShown: boolean,
}

const Layout = ({ children, className, ...rest }: IProps): JSX.Element => {
    const [shoppingCart, setShoppingCart] = React.useState<IShoppingCartState>({ isShown: false });
    const [paymentPopup, setPaymentPopup] = React.useState<IPaymentPopupState>({ isShown: false, items: [] });
    const [productDetailsPopup, setProductDetailsPopup] = React.useState<IProductDetailsState>({ isShown: false });

    const handleOnRequestShowPayment = (data: unknown): void => {
        if (!data) return;
        setPaymentPopup({
            isShown: true,
            items: data as ICartItem[],
        });
    };
    const handleOnRequestShowShoppingCart = (): void => {
        setShoppingCart({ isShown: true });
    };
    const handleOnRequestShowProductDetails = (product: unknown): void => {
        setProductDetailsPopup({
            isShown: true,
            product: product as IProduct,
        });
    };

    React.useEffect(() => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });

        EventService.instance.onRequestShowPayment.addEventListener(handleOnRequestShowPayment);
        EventService.instance.onRequestShowProductDetails.addEventListener(handleOnRequestShowProductDetails);
        EventService.instance.onRequestShowShoppingCart.addEventListener(handleOnRequestShowShoppingCart);

        return (): void => {
            EventService.instance.onRequestShowPayment.removeEventListener(handleOnRequestShowPayment);
            EventService.instance.onRequestShowProductDetails.removeEventListener(handleOnRequestShowProductDetails);
            EventService.instance.onRequestShowShoppingCart.removeEventListener(handleOnRequestShowShoppingCart);
        };
    }, []);

    return (
        <>
            <div className={classname([className, styles.container, 'layout'])} {...rest}>
                {children}
            </div>
            {
                shoppingCart.isShown
                &&
                <Cart onClose={(): void => {
                    setShoppingCart({ isShown: false });
                }} />
            }
            {
                paymentPopup.isShown && paymentPopup.items
                &&
                <Payment items={paymentPopup.items} onClose={(): void => {
                    setPaymentPopup({ isShown: false });
                }} />
            }
            {
                productDetailsPopup.isShown && productDetailsPopup.product
                &&
                <ProductDetails data={productDetailsPopup.product} onClose={(): void => {
                    setProductDetailsPopup({ isShown: false });
                }} />
            }
        </>
    );
};

export default Layout;