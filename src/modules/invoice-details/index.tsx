import moment from 'moment';
import React from 'react';
import Button from '../../components/basic/button';
import PaymentSummary from '../../components/payment-summary';
import PopupWrapper from '../../components/popup/popup-wrapper';
import InvoiceService from '../../services/invoice.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
    data: IInvoiceItem,
}

const InvoiceDetails = ({ onClose, className, data }: IProps): JSX.Element => {
    const handleDeleteInvoice = (): void => {
        InvoiceService.instance.remove(data.timestamp);
        if (onClose) onClose();
    };

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            title={{
                text: 'Thông tin đơn hàng đã đặt',
                icon: {
                    type: 'fa',
                    value: 'fa fa-money-check',
                }
            }}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <PaymentSummary cartItems={data.items} disabledUpdateCartItem/>
                    <br />
                </div>

                <div className={styles.right}>
                    <ShippingInfo {...{
                        ...data.buyer,
                        time: moment(data.timestamp).format('DD/MM/YYYY, HH:mm')
                    }} />
                    <div className={styles.action}>
                        <Button label='Xóa đơn hàng' onClick={handleDeleteInvoice} />
                    </div>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default InvoiceDetails;