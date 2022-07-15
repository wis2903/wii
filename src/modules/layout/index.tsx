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
import Confirmation from '../../components/confirmation';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    isAdminLayout?: boolean,
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
interface IInvoiceDetailsPopupState {
    isShown: boolean,
    invoice?: IInvoiceItem,
    isFromAdmin?: boolean,
}
interface IConfirmationPopupState {
    isShown: boolean,
    message?: string,
    isAlert?: boolean,
}

const Layout = ({ children, className, isAdminLayout, ...rest }: IProps): JSX.Element => {
    const [shoppingCart, setShoppingCart] = React.useState<IShoppingCartState>({ isShown: false });
    const [paymentPopup, setPaymentPopup] = React.useState<IPaymentPopupState>({ isShown: false, items: [] });
    const [productDetailsPopup, setProductDetailsPopup] = React.useState<IProductDetailsPopupState>({ isShown: false });
    const [invoiceDetailsPopup, setInvoiceDetailsPopup] = React.useState<IInvoiceDetailsPopupState>({ isShown: false });
    const [confirmationPopup, setConfirmationPopup] = React.useState<IConfirmationPopupState>({ isShown: false });

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
            invoice: Object(data).invoice as IInvoiceItem,
            isFromAdmin: Boolean(Object(data).isFromAdmin),
        });
    };
    const handleOnRequestShowConfirmation = (data: unknown): void => {
        setConfirmationPopup({
            isShown: true,
            message: String(Object(data).message),
            isAlert: Boolean(Object(data).alert)
        });
        setPaymentPopup({ isShown: false });
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
        EventService.instance.onRequestShowConfirmation.addEventListener(handleOnRequestShowConfirmation);

        return (): void => {
            EventService.instance.onRequestShowPayment.removeEventListener(handleOnRequestShowPayment);
            EventService.instance.onRequestShowProductDetails.removeEventListener(handleOnRequestShowProductDetails);
            EventService.instance.onRequestShowShoppingCart.removeEventListener(handleOnRequestShowShoppingCart);
            EventService.instance.onRequestShowInvoiceDetails.removeEventListener(handleOnRequestShowInvoiceDetails);
            EventService.instance.onRequestShowConfirmation.removeEventListener(handleOnRequestShowConfirmation);
        };
    }, []);

    return (
        <>
            {
                !isAdminLayout
                &&
                <Header />
            }

            <div className={classname([className, styles.container, 'layout'])} {...rest}>
                {children}
            </div>
            {
                !isAdminLayout
                &&
                <Footer />
            }

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
                <InvoiceDetails data={invoiceDetailsPopup.invoice} isFromAdmin={invoiceDetailsPopup.isFromAdmin} onClose={(): void => {
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
            {
                confirmationPopup.isShown && confirmationPopup.message
                &&
                <Confirmation
                    message={confirmationPopup.message}
                    isAlert={confirmationPopup.isAlert}
                    onClose={(): void => {
                        setConfirmationPopup({ isShown: false });
                    }}
                />
            }
        </>
    );
};

export default Layout;