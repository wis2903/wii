import React from 'react';
import Button from '../../components/basic/button';
import PaymentSummary from '../../components/payment-summary';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { hideSensitiveInformation } from '../../helpers/utils.helper';
import { emailRegex, phoneRegex } from '../../resources/constants/regex';
import { emptyBuyerInfo } from '../../resources/constants/utils';
import CartService from '../../services/cart.service';
import EventService from '../../services/event.service';
import InvoiceService from '../../services/invoice.service';
import PaymentService from '../../services/payment.service';
import UtilsService from '../../services/utils.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
    items: ICartItem[],
}
interface IBuyerInfoState {
    data: IBuyer,
    error: IBuyerInfoValidationError,
}
interface IProductsState {
    isLoading: boolean,
    data: IProduct[],
}

const Payment = ({ onClose, className, items }: IProps): JSX.Element => {
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [finalItems, setFinalItems] = React.useState<ICartItem[]>(items);
    const [isRememberBuyerInfo, setIsRememberBuyInfo] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<IProductsState>({ isLoading: true, data: [] });
    const [buyerInfo, setBuyerInfo] = React.useState<IBuyerInfoState>({
        data: { ...emptyBuyerInfo },
        error: {},
    });

    const handleOnAmountChange = (productId: IObjectId, color: string, amount: number): void => {
        const tmp = [...finalItems];
        const itm = tmp.find(item => item.productId === productId && item.color.value === color);
        if (itm) itm.amount = amount;
        setFinalItems(tmp);
    };

    const handleOnRemoveCartItem = (cartItem: ICartItem): void => {
        setFinalItems(current => current.filter(item => {
            if (item.productId !== cartItem.productId) return true;
            return item.color.value !== cartItem.color.value;
        }));
    };

    const validate = (): boolean => {
        let flag = true;
        const error: IBuyerInfoValidationError = {};
        if (!buyerInfo.data.name) {
            error.name = 'Vui l??ng nh???p t??n ng?????i nh???n';
            flag = false;
        }
        if (!buyerInfo.data.phoneNumber) {
            error.phoneNumber = 'Vui l??ng nh???p s??? ??i???n tho???i';
            flag = false;
        } else if (!phoneRegex.test(buyerInfo.data.phoneNumber)) {
            error.phoneNumber = 'S??? ??i???n tho???i kh??ng ????ng, vui l??ng ki???m tra l???i';
            flag = false;
        }
        if (buyerInfo.data.email && !emailRegex.test(buyerInfo.data.email)) {
            error.email = 'Email kh??ng ????ng, vui l??ng ki???m tra l???i';
            flag = false;
        }
        if (!buyerInfo.data.address) {
            error.address = 'Vui l??ng nh???p ?????a ch??? ng?????i nh???n';
            flag = false;
        }

        setBuyerInfo(current => ({
            ...current,
            error,
        }));
        return flag;
    };

    const handlePayment = async (): Promise<void> => {
        if (products.isLoading) return;
        if (!products.data.length) {
            UtilsService.instance.alert('Kh??ng th??? ti???n h??nh ?????t h??ng do kh??ng t??m th???y th??ng tin s???n ph???m. Xin vui l??ng th??? l???i.');
            return;
        }
        if (!finalItems.length) {
            UtilsService.instance.alert('Kh??ng th??? ti???n h??nh ?????t h??ng v?? ????n h??ng kh??ng c?? s???n ph???m n??o. Vui l??ng ch???n ??t nh???t 1 s???n ph???m.');
            return;
        }
        if (isProcessing || !validate()) return;
        setIsProcessing(true);
        const invoiceCartItems: ICartItemWithExtraProductData[] = [];
        finalItems.forEach(item => {
            invoiceCartItems.push({
                amount: item.amount,
                productId: item.productId,
                productPrice: products.data.find(p => p.id === item.productId)?.price || 0,
                color: {
                    ...item.color,
                    images: item.color.images && item.color.images.length ? [item.color.images[0]] : [],
                },
            });
        });
        const invoiceData = {
            items: invoiceCartItems,
            buyer: {
                name: buyerInfo.data.name,
                email: hideSensitiveInformation(buyerInfo.data.email),
                phoneNumber: hideSensitiveInformation(buyerInfo.data.phoneNumber),
            },
            timestamp: +new Date(),
        };
        const success = await PaymentService.instance.createOrder({
            ...invoiceData,
            buyer: {
                name: buyerInfo.data.name,
                email: buyerInfo.data.email,
                phoneNumber: buyerInfo.data.phoneNumber,
                address: buyerInfo.data.address
            },
        });
        if (!success) {
            UtilsService.instance.alert('R???t ti???c ch??ng t??i kh??ng th??? x??? l?? ????n h??ng c???a b???n v?? c?? l???i x???y ra. Xin vui l??ng th??? l???i.');
            setIsProcessing(false);
            return;
        }
        await InvoiceService.instance.add(invoiceData);
        await CartService.instance.removeMultipleItems(finalItems.map(item => ({
            productId: item.productId,
            color: item.color.value,
        })));
        setIsProcessing(false);
        if (onClose) onClose();
        if (isRememberBuyerInfo) PaymentService.instance.setCachedBuyerInfo(buyerInfo.data);
        else PaymentService.instance.removeCachedBuyerInfo();
        EventService.instance.onPaymentSuccess.trigger();
    };

    React.useEffect(() => {
        PaymentService.instance.getCachedBuyerInfo().then(res => {
            if (res) {
                setBuyerInfo(current => ({
                    ...current,
                    data: res,
                }));
                setIsRememberBuyInfo(true);
            }
        });
    }, []);

    React.useEffect(() => {
        setFinalItems(items);
    }, [items]);

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            title={{
                text: 'X??c nh???n th??ng tin ?????t h??ng',
                icon: {
                    type: 'fa',
                    value: 'fa fa-truck',
                }
            }}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <PaymentSummary
                        cartItems={finalItems}
                        onCartItemAmountChange={handleOnAmountChange}
                        onRemoveCartItem={handleOnRemoveCartItem}
                        onProductsLoaded={(prds): void => {
                            setProducts({ isLoading: false, data: prds });
                        }}
                    />
                    <br />
                </div>

                <div className={styles.right}>
                    <ShippingInfo
                        error={buyerInfo.error}
                        onChange={(data): void => {
                            setBuyerInfo(current => ({
                                ...current,
                                data,
                            }));
                        }}
                        onRememberBuyerInfoChange={(isRemember): void => {
                            setIsRememberBuyInfo(isRemember);
                        }}
                    />
                    <div className={styles.action}>
                        <Button
                            primary
                            label={isProcessing ? '??ang x??? l??...' : 'Ti???n h??nh ?????t h??ng'}
                            onClick={handlePayment}
                        />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default Payment;