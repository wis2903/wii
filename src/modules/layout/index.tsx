import React from 'react';
import styles from './styles.module.scss';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Payment from '../payment';
import Cart from '../cart';
import ProductDetails from '../product-details';
import EventService from '../../services/event.service';
import InvoiceDetails from '../invoice-details';
import CategoryService from '../../services/category.service';
import Header from '../header';
import Footer from '../footer';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}
interface IPaymentPopupState {
    isShown: boolean,
    items?: ICartItem[],
}
interface IProductDetailsPopupState {
    isShown: boolean,
    product?: IProduct,
}
interface IShoppingCartState {
    isShown: boolean,
}
interface IInvoiceDetailsPopup {
    isShown: boolean,
    invoice?: IInvoiceItem,
}

const Layout = ({ children, className, ...rest }: IProps): JSX.Element => {
    const [shoppingCart, setShoppingCart] = React.useState<IShoppingCartState>({ isShown: false });
    const [paymentPopup, setPaymentPopup] = React.useState<IPaymentPopupState>({ isShown: false, items: [] });
    const [productDetailsPopup, setProductDetailsPopup] = React.useState<IProductDetailsPopupState>({ isShown: false });
    const [invoiceDetailsPopup, setInvoiceDetailsPopup] = React.useState<IInvoiceDetailsPopup>({ isShown: false });

    const handleOnRequestShowPayment = (data: unknown): void => {
        if (!data) return;
        setPaymentPopup({
            isShown: true,
            items: data as ICartItem[],
        });
        setInvoiceDetailsPopup({ isShown: false });
    };
    const handleOnRequestShowShoppingCart = (): void => {
        setShoppingCart({ isShown: true });
        setInvoiceDetailsPopup({ isShown: false });
    };
    const handleOnRequestShowProductDetails = (product: unknown): void => {
        setProductDetailsPopup({
            isShown: true,
            product: product as IProduct,
        });
    };
    const handleOnRequestShowInvoiceDetails = (data: unknown): void => {
        setInvoiceDetailsPopup({
            isShown: true,
            invoice: data as IInvoiceItem,
        });
    };

    React.useEffect(() => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });
        if (!CategoryService.instance.categories.length) CategoryService.instance.list();
        else EventService.instance.onCategoriesLoaded.trigger();

        EventService.instance.onRequestShowPayment.addEventListener(handleOnRequestShowPayment);
        EventService.instance.onRequestShowProductDetails.addEventListener(handleOnRequestShowProductDetails);
        EventService.instance.onRequestShowShoppingCart.addEventListener(handleOnRequestShowShoppingCart);
        EventService.instance.onRequestShowInvoiceDetails.addEventListener(handleOnRequestShowInvoiceDetails);

        return (): void => {
            EventService.instance.onRequestShowPayment.removeEventListener(handleOnRequestShowPayment);
            EventService.instance.onRequestShowProductDetails.removeEventListener(handleOnRequestShowProductDetails);
            EventService.instance.onRequestShowShoppingCart.removeEventListener(handleOnRequestShowShoppingCart);
            EventService.instance.onRequestShowInvoiceDetails.removeEventListener(handleOnRequestShowInvoiceDetails);
        };
    }, []);

    return (
        <>
            <Header />
            <div className={classname([className, styles.container, 'layout'])} {...rest}>
                {children}
            </div>
            <Footer />
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
                invoiceDetailsPopup.isShown && invoiceDetailsPopup.invoice
                &&
                <InvoiceDetails data={invoiceDetailsPopup.invoice} onClose={(): void => {
                    setInvoiceDetailsPopup({ isShown: false });
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