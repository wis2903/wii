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
            error.name = 'Vui lòng nhập tên người nhận';
            flag = false;
        }
        if (!buyerInfo.data.phoneNumber) {
            error.phoneNumber = 'Vui lòng nhập số điện thoại';
            flag = false;
        } else if (!phoneRegex.test(buyerInfo.data.phoneNumber)) {
            error.phoneNumber = 'Số điện thoại không đúng, vui lòng kiểm tra lại';
            flag = false;
        }
        if (buyerInfo.data.email && !emailRegex.test(buyerInfo.data.email)) {
            error.email = 'Email không đúng, vui lòng kiểm tra lại';
            flag = false;
        }
        if (!buyerInfo.data.address) {
            error.address = 'Vui lòng nhập địa chỉ người nhận';
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
            UtilsService.instance.alert('Không thể tiến hành đặt hàng do không tìm thấy thông tin sản phẩm. Xin vui lòng thử lại.');
            return;
        }
        if (!finalItems.length) {
            UtilsService.instance.alert('Không thể tiến hành đặt hàng vì đơn hàng không có sản phẩm nào. Vui lòng chọn ít nhất 1 sản phẩm.');
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
            UtilsService.instance.alert('Rất tiếc chúng tôi không thể xử lý đơn hàng của bạn vì có lỗi xảy ra. Xin vui lòng thử lại.');
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
                text: 'Xác nhận thông tin đặt hàng',
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
                            label={isProcessing ? 'Đang xử lý...' : 'Tiến hành đặt hàng'}
                            onClick={handlePayment}
                        />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default Payment;