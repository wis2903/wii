import moment from 'moment';
import React from 'react';
import Button from '../../components/basic/button';
import Input from '../../components/basic/input';
import Select from '../../components/basic/select';
import Textbox from '../../components/basic/textbox';
import PaymentSummary from '../../components/payment-summary';
import PopupWrapper from '../../components/popup/popup-wrapper';
import { parseOrderData } from '../../helpers/data.helper';
import { classname } from '../../helpers/utils.helper';
import { OrderStatusEnum } from '../../resources/constants/enum';
import { orderStatuses } from '../../resources/constants/utils';
import EventService from '../../services/event.service';
import InvoiceService from '../../services/invoice.service';
import PaymentService from '../../services/payment.service';
import UtilsService from '../../services/utils.service';
import ShippingInfo from './shipping-info';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: IInvoiceItem | IOrderItem,
    isFromAdmin?: boolean,
    onClose?: VoidFunction,
    onUpdated?: (data: IInvoiceItem | IOrderItem) => void,
}

const InvoiceDetails = ({ isFromAdmin, className, data, onUpdated, onClose }: IProps): JSX.Element => {
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [note, setNote] = React.useState<string>(Object(data).extraInfo?.note || '');
    const [shippingCode, setShippingCode] = React.useState<string>(Object(data).extraInfo?.shippingCode || '');
    const [status, setStatus] = React.useState<string>('');

    const handleDeleteInvoice = async (): Promise<void> => {
        if (onClose) onClose();
        const confirmed = await UtilsService.instance.confirm('Vui lòng xác nhận tác vụ: Bạn có chắc chắn muốn xóa đơn hàng này không?');
        if (confirmed) InvoiceService.instance.remove(data.timestamp);
    };

    const handleUpdateInvoice = async (): Promise<void> => {
        if (isProcessing) return;
        setIsProcessing(true);

        if (!status) {
            UtilsService.instance.alert('Bạn chưa cập nhật trạng thái cho đơn hàng. Vui lòng kiểm tra lại và cập nhật.');
            setIsProcessing(false);
            return;
        }

        if (status === OrderStatusEnum.shipped && !shippingCode) {
            UtilsService.instance.alert('Trạng thái đã giao hàng yêu cầu bắt buộc phải có mã vận đơn của bên vận chuyển. Vui lòng kiểm tra lại và điền mã vận đơn.');
            setIsProcessing(false);
            return;
        }

        const newOrderData = {
            ...parseOrderData(Object(data)),
            status,
            extraInfo: {
                ...Object(Object(data).extraInfo),
                note,
                shippingCode,
            }
        };
        const success = await PaymentService.instance.updateOrder(newOrderData);
        if (!success) {
            UtilsService.instance.alert('Không thể cập nhật thông tin đơn hàng do có lỗi xảy ra. Xin vui lòng thử lại');
            setIsProcessing(false);
            return;
        }

        EventService.instance.onOrderItemUpdated.trigger(newOrderData);
        if (onUpdated) onUpdated(newOrderData);
        setIsProcessing(false);
        if (onClose) onClose();
    };

    return (
        <PopupWrapper
            className={classname([styles.container, className])}
            bodyClassName={styles.body}
            title={{
                text: 'Thông tin đơn hàng đã đặt',
                icon: {
                    type: 'fa',
                    value: 'fa fa-money-check',
                }
            }}
            footer={(
                <>
                    <Button label='Đóng' onClick={onClose} />
                    {
                        isFromAdmin
                            ? <Button primary label={isProcessing ? 'Đang xử lý...' : 'Lưu lại'} onClick={handleUpdateInvoice} />
                            : <Button primary label='Xóa' onClick={handleDeleteInvoice} />
                    }
                </>
            )}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <PaymentSummary cartItems={data.items} disabledUpdateCartItem />
                    <br />
                </div>

                <div className={styles.right}>
                    <ShippingInfo {...{
                        ...data.buyer,
                        address: isFromAdmin ? data.buyer.address : undefined,
                        time: moment(data.timestamp).format('DD/MM/YYYY, HH:mm'),
                    }} />

                    {
                        isFromAdmin
                        && <>
                            <br />
                            <h3 className={styles.title}>Cập nhật thông tin</h3>
                            <Select
                                className={styles.select}
                                dropdownDir='top'
                                placeholder='Chọn trạng thái'
                                options={orderStatuses.map(item => ({
                                    label: item.title,
                                    value: item.value,
                                }))}
                                label='Trạng thái'
                                onChange={(opt): void => {
                                    setStatus(String(opt.value));
                                }}
                            />
                            {
                                (
                                    status === OrderStatusEnum.shipped
                                    || Object(data).extraInfo?.shippingCode
                                ) && <Input
                                    required
                                    className={styles.input}
                                    label='Mã vận đơn'
                                    initValue={Object(data).extraInfo?.shippingCode}
                                    onValueChange={(value): void => {
                                        setShippingCode(value);
                                    }}
                                />

                            }
                            <Textbox
                                label='Ghi chú'
                                className={styles.input}
                                initValue={Object(data).extraInfo?.note}
                                onValueChange={(value): void => {
                                    setNote(value);
                                }}
                            />
                        </>
                    }
                </div>
            </div>
        </PopupWrapper>
    );
};

export default InvoiceDetails;