import moment from 'moment';
import React from 'react';
import Button from '../../../../components/basic/button';
import Checkbox from '../../../../components/basic/checkbox';
import Tooltip from '../../../../components/basic/tooltip';
import { classname, getTotalProductsNumberFromCartItems } from '../../../../helpers/utils.helper';
import { orderStatuses } from '../../../../resources/constants/utils';
import EventService from '../../../../services/event.service';
import styles from './styles.module.scss';

interface IProps {
    data: IOrderItem,
    onChecked?: VoidFunction,
    onUnchecked?: VoidFunction,
    uncheck?: (func: VoidFunction) => void,
}

const OrderItem = ({ data, onChecked, onUnchecked, uncheck }: IProps): JSX.Element => {
    const statusToString = (): string => {
        return orderStatuses.find(item => item.value === data.status)?.title || 'Không rõ';
    };

    return (
        <div className={classname([styles.container, styles[data.status]])}>
            <div className={styles.checkbox}>
                <Checkbox
                    onChecked={onChecked}
                    onUnchecked={onUnchecked}
                    clear={(func): void => {
                        if (uncheck) uncheck(func);
                    }}
                />
            </div>

            <div className={styles.mainContent}>
                <div className={styles.code}><span>Mã đơn hàng: {data.timestamp}</span></div>
                <Tooltip text={`${data.buyer.phoneNumber} - ${data.buyer.name}`}>
                    <div className={styles.buyer}>{data.buyer.phoneNumber} - {data.buyer.name}</div>
                </Tooltip>
                <div className={styles.note}>
                    {getTotalProductsNumberFromCartItems(data.items)} sản phẩm
                    {' - '}
                    {moment(data.timestamp).format('DD/MM/YYYY, HH:mm')}
                </div>
                <div className={styles.status}><span>Trạng thái: </span>{statusToString()}</div>
            </div>
            <div className={styles.actions}>
                <Button className={styles.viewButton} onClick={(): void => {
                    EventService.instance.onRequestShowInvoiceDetails.trigger({ invoice: data, isFromAdmin: true });
                }}>
                    Chi tiết
                </Button>
            </div>
        </div>
    );
};

export default OrderItem;