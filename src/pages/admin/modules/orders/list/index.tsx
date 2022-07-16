import React from 'react';
import { IOrdersState } from '..';
import Select from '../../../../../components/basic/select';
import { OrderStatusEnum } from '../../../../../resources/constants/enum';
import { orderStatuses } from '../../../../../resources/constants/utils';
import EventService from '../../../../../services/event.service';
import PaymentService from '../../../../../services/payment.service';
import OrderItem from '../../../components/order-item';
import Empty from '../empty';
import Panel from '../panel';
import Placeholder from '../placeholder';
import styles from './styles.module.scss';

interface IProps {
    orders: IOrdersState,
    onUpdated?: VoidFunction,
}

const List = ({ orders, onUpdated }: IProps): JSX.Element => {
    const [checkedOrders, setCheckedOrders] = React.useState<IOrderItem[]>([]);
    const uncheckOrderItemFunctions = React.useRef<VoidFunction[]>([]);

    const generateContent = (): JSX.Element => {
        if (orders.isLoading) return (
            <div>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </div>
        );
        if (!orders.data.length) return <Empty message='Không tìm thấy đơn hàng nào.' />;
        return <>
            {orders.data.map(item =>
                <OrderItem
                    key={item.id}
                    data={item}
                    onChecked={(): void => {
                        setCheckedOrders(current => [...current, item]);
                    }}
                    onUnchecked={(): void => {
                        setCheckedOrders(current => current.filter(ord => ord.id !== item.id));
                    }}
                    uncheck={(func): void => {
                        uncheckOrderItemFunctions.current.push(func);
                    }}
                />
            )}
        </>;
    };

    return (
        <Panel
            className={styles.container}
            title='Danh sách đơn hàng'
            extra={
                !!checkedOrders.length
                &&
                <>
                    <Select
                        className={styles.select}
                        label='Trạng thái'
                        placeholder='Chọn trạng thái'
                        options={orderStatuses.filter(item => item.value === OrderStatusEnum.processed || item.value === OrderStatusEnum.processing)
                            .map(item => ({
                                label: item.title,
                                value: item.value,
                            }))}
                        onChange={async (opt): Promise<void> => {
                            EventService.instance.onRequestShowLoader.trigger(true);
                            for (let i = 0; i < checkedOrders.length; i++) {
                                await PaymentService.instance.updateOrder({
                                    ...checkedOrders[i],
                                    status: opt.value,
                                });
                            }
                            setTimeout(() => {
                                EventService.instance.onRequestShowLoader.trigger(false);
                                uncheckOrderItemFunctions.current.forEach(func => { func(); });
                                setCheckedOrders([]);
                                if (onUpdated) onUpdated();
                            }, 500);
                        }}
                    />
                </>
            }
        >
            {generateContent()}
        </Panel>
    );
};

export default List;