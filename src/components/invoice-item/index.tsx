import moment from 'moment';
import React from 'react';
import { getTotalProductsNumberFromCartItems } from '../../helpers/utils.helper';
import EventService from '../../services/event.service';
import Button from '../basic/button';
import styles from './styles.module.scss';

interface IProps {
    data: IInvoiceItem,
}

const InvoiceItem = ({ data }: IProps): JSX.Element => {
    const handleShowInvoieDetails = (): void => {
        EventService.instance.onRequestShowInvoiceDetails.trigger({ invoice: data });
    };

    return (
        <Button className={styles.container} onClick={handleShowInvoieDetails}>
            Bạn đã đặt
            <span>{getTotalProductsNumberFromCartItems(data.items)} sản phẩm</span>
            ngày<span>{moment(data.timestamp).format('DD/MM/YYYY')}, {moment(data.timestamp).format('HH:mm')}</span>
        </Button>
    );
};

export default InvoiceItem;