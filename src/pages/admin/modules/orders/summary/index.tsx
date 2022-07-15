import React from 'react';
import { IOrdersState } from '..';
import Blank from '../../../../../components/basic/blank';
import { OrderStatusEnum } from '../../../../../resources/constants/enum';
import ProductService from '../../../../../services/product.service';
import Empty from '../empty';
import Panel from '../panel';
import Placeholder from '../placeholder';
import SummaryItem from './item';
import styles from './styles.module.scss';

interface IProps {
    orders: IOrdersState,
}
interface IProductsState {
    isLoading: boolean,
    data: IProduct[],
}

const Summary = ({ orders }: IProps): JSX.Element => {
    const [products, setProducts] = React.useState<IProductsState>({ isLoading: true, data: [] });

    const getProcessingOrders = (): IOrderItem[] => {
        return orders.data.filter(item => item.status === OrderStatusEnum.processing);
    };

    const generateSummaryItem = (item: ICartItem): JSX.Element => {
        const prd = products.data.find(p => p.id === item.productId);
        if (!prd) return <Blank />;
        return <SummaryItem
            {...item}
            product={prd}
        />;
    };

    const generateContent = (): JSX.Element => {
        if (orders.isLoading || products.isLoading) return (
            <div>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </div>
        );

        const processingOrders = getProcessingOrders();

        if (!processingOrders.length) return (
            <Empty message='Chưa có đơn hàng nào được xác nhận thông tin.' />
        );

        const items: ICartItem[] = [];
        processingOrders.forEach(ord => {
            ord.items.forEach(cardItem => {
                const existedItem = items.find(c => c.productId === cardItem.productId && c.color.value === cardItem.color.value);
                if (!existedItem) items.push({ ...cardItem });
                else existedItem.amount += cardItem.amount;
            });
        });

        return (
            <>
                {items.map((item, i) =>
                    <div className={styles.summaryItemWrapper} key={`summary-item-${i}-${item.productId}-${item.color.value}`}>
                        {generateSummaryItem(item)}
                    </div>
                )}
            </>
        );
    };

    React.useEffect(() => {
        const processingOrders = getProcessingOrders();
        if (processingOrders.length) {
            const prdIds: string[] = [];
            processingOrders.forEach(ord => {
                ord.items.forEach(item => {
                    if (!prdIds.find(id => id === item.productId)) prdIds.push(String(item.productId));
                });
            });

            if (prdIds.length) {
                setProducts({ isLoading: true, data: [] });
                ProductService.instance.getByIds(prdIds).then(res => {
                    setProducts({ isLoading: false, data: res });
                });
            } else {
                setProducts({ isLoading: false, data: [] });
            }
        } else {
            setProducts({ isLoading: false, data: [] });
        }
    }, [orders]);

    return (
        <Panel className={styles.container} title='Tóm tắt sản phẩm cần đặt hàng'>
            {generateContent()}
        </Panel>
    );
};

export default Summary;