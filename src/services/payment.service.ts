import { parseBuyerData, parseOrderData } from '../helpers/data.helper';
import { LocalStorageKeyEnum, OrderStatusEnum } from '../resources/constants/enum';
import EventService from './event.service';
import FirebaseService from './firebase.service';
import ProductService from './product.service';
import StorageService from './storage.service';

class PaymentService {
    private static inst?: PaymentService;

    public static get instance(): PaymentService {
        if (!PaymentService.inst) PaymentService.inst = new PaymentService();
        return PaymentService.inst;
    }

    public setCachedBuyerInfo = async (buyerInfo: IBuyer): Promise<void> => {
        StorageService.instance.set(LocalStorageKeyEnum.cachedBuyInfo, buyerInfo);
    }

    public getCachedBuyerInfo = async (): Promise<IBuyer | undefined> => {
        const res = await StorageService.instance.get(LocalStorageKeyEnum.cachedBuyInfo);
        if (!res) return undefined;
        return parseBuyerData(Object(res));
    }

    public removeCachedBuyerInfo = async (): Promise<void> => {
        StorageService.instance.remove(LocalStorageKeyEnum.cachedBuyInfo);
    }

    public createOrder = async (data: IInvoiceItem): Promise<boolean> => {
        return new Promise(resolve => {
            const exec = async (): Promise<void> => {
                EventService.instance.onRequestShowLoader.trigger(true);
                try {
                    await FirebaseService.instance.addDocument('orders', Object({
                        ...data,
                        status: OrderStatusEnum.open,
                        phoneNumber: String(data.buyer.phoneNumber),
                    }));
                    data.items.forEach(async (item) => {
                        const product = await ProductService.instance.getById(String(item.productId));
                        if (product) ProductService.instance.update({ ...product, buyersNumber: product.buyersNumber + 1 });
                    });
                    setTimeout(() => {
                        resolve(true);
                        EventService.instance.onRequestShowLoader.trigger(false);
                    }, 500);
                } catch (e) {
                    setTimeout(() => {
                        resolve(false);
                        EventService.instance.onRequestShowLoader.trigger(false);
                    }, 500);
                }
            };

            exec();
        });
    }

    public getOrders = async (): Promise<IOrderItem[]> => {
        const orders = (await FirebaseService.instance.getDocuments('orders')).sort((a, b) => a.data.timestamp > b.data.timestamp ? -1 : 1);
        return orders.map(item => ({
            ...parseOrderData(Object(item.data)),
            id: item.id,
        }));
    }

    public updateOrder = async (order: IOrderItem): Promise<boolean> => {
        return new Promise(resolve => {
            const { id, ...rest } = order;
            FirebaseService.instance.updateDocument('orders', id, Object(rest)).then(res => {
                resolve(res);
            });
        });
    }
}

export default PaymentService;