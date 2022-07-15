import React from 'react';
import Wrapper from '../../../../components/basic/wrapper';
import PageTitle from '../../components/page-title';
import styles from './styles.module.scss';
import SearchIcon from '../../../../resources/images/search.png';
import Input from '../../../../components/basic/input';
import List from './list';
import Summary from './summary';
import PaymentService from '../../../../services/payment.service';
import EventService from '../../../../services/event.service';
import { parseOrderData } from '../../../../helpers/data.helper';

export interface IOrdersState {
    isLoading: boolean,
    data: IOrderItem[],
}

const OrdersManagement = (): JSX.Element => {
    const [keyword, setKeyword] = React.useState<string>('');
    const [orders, setOrders] = React.useState<IOrdersState>({ isLoading: true, data: [] });

    const handleOnOrderItemUpdated = (data: unknown): void => {
        const ord = parseOrderData(Object(data));
        setOrders(current => ({
            ...current,
            data: current.data.map(item => item.id === ord.id ? ord : item),
        }));
    };

    const getOrderItems = (): void => {
        setOrders({ isLoading: true, data: [] });
        PaymentService.instance.getOrders().then(ords => {
            setOrders({ isLoading: false, data: ords });
        });
    };

    React.useEffect(() => {
        getOrderItems();
        EventService.instance.onOrderItemUpdated.addEventListener(handleOnOrderItemUpdated);
        return (): void => {
            EventService.instance.onOrderItemUpdated.removeEventListener(handleOnOrderItemUpdated);
        };
    }, []);

    const filteredOrders: IOrdersState = {
        isLoading: orders.isLoading,
        data: orders.data.filter(item => String(item.timestamp).indexOf(keyword) > -1)
    };

    return (
        <div className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <div className={styles.head}>
                    <PageTitle text='Quản lý đơn hàng' />

                    <div className={styles.right}>
                        <Input
                            className={styles.search}
                            label='Tìm kiếm theo mã đơn hàng...'
                            icon={{
                                type: 'image',
                                value: SearchIcon,
                            }}
                            onValueChange={(value): void => {
                                setKeyword(value);
                            }}
                        />
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <List orders={filteredOrders} onUpdated={getOrderItems} />
                    <Summary orders={orders} />
                </div>
            </Wrapper>
        </div>
    );
};

export default OrdersManagement;