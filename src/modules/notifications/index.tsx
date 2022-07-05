import React from 'react';
import InvoiceItem from '../../components/invoice-item';
import { disableScroll, enableScroll } from '../../helpers/dom.helpers';
import InvoiceService from '../../services/invoice.service';
import styles from './styles.module.scss';

const Notifications = (): JSX.Element => {
    const [invoices, setInvoices] = React.useState<IInvoiceItem[]>([]);

    const getInvoices = async (): Promise<void> => {
        const res = await InvoiceService.instance.list();
        setInvoices(res);
    };

    React.useEffect(() => {
        getInvoices();
        disableScroll();

        return (): void => {
            enableScroll();
        };
    }, []);

    return (
        <div className={styles.container}>
            {
                !invoices.length
                    ? <span className={styles.empty}>Bạn chưa đặt đơn hàng nào</span>
                    :
                    <div className={styles.list}>
                        {
                            invoices.map((item, i) =>
                                <InvoiceItem data={item} key={`invoice-item-${i}-${item.timestamp}`} />
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default Notifications;