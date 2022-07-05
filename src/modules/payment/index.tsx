import React from 'react';
import Button from '../../components/basic/button';
import PaymentSummary from '../../components/payment-summary';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { emailRegex, phoneRegex } from '../../resources/constants/regex';
import { emptyBuyerInfo } from '../../resources/constants/utils';
import CartService from '../../services/cart.service';
import EventService from '../../services/event.service';
import InvoiceService from '../../services/invoice.service';
import PaymentService from '../../services/payment.service';
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

const Payment = ({ onClose, className, items }: IProps): JSX.Element => {
    const [finalItems, setFinalItems] = React.useState<ICartItem[]>(items);
    const [buyerInfo, setBuyerInfo] = React.useState<IBuyerInfoState>({
        data: { ...emptyBuyerInfo },
        error: {},
    });

    const handleOnAmountChange = (productId: IObjectId, color: string, amount: number): void => {
        const tmp = [...finalItems];
        const itm = tmp.find(item => item.product.id === productId && item.color.value === color);
        if (itm) itm.amount = amount;
        setFinalItems(tmp);
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
        if (!buyerInfo.data.email) {
            error.email = 'Vui lòng nhập email';
            flag = false;
        } else if (!emailRegex.test(buyerInfo.data.email)) {
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
        if (!validate()) return;

        await CartService.instance.removeMultipleItems(finalItems.map(item => ({
            productId: item.product.id,
            color: item.color.value,
        })));
        if (onClose) onClose();
        await InvoiceService.instance.add({
            items: finalItems,
            buyer: buyerInfo.data,
            timestamp: +new Date(),
        });
        PaymentService.instance.setCachedBuyerInfo(buyerInfo.data);
        EventService.instance.onPaymentSuccess.trigger();
    };

    React.useEffect(() => {
        PaymentService.instance.getCachedBuyerInfo().then(res => {
            if (res) setBuyerInfo(current => ({
                ...current,
                data: res,
            }));
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
                    <PaymentSummary cartItems={finalItems} onCartItemAmountChange={handleOnAmountChange} />
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
                    />
                    <div className={styles.action}>
                        <Button primary label='Tiến hành đặt hàng' onClick={handlePayment} />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default Payment;