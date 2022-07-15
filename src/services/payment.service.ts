import { parseBuyerData, parseOrderData } from '../helpers/data.helper';
import { LocalStorageKeyEnum, OrderStatusEnum } from '../resources/constants/enum';
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
            return true;
        } catch (e) {
            return false;
        }
    }

    public getOrders = async (): Promise<IOrderItem[]> => {
        const orders = (await FirebaseService.instance.getDocuments('orders')).sort((a, b) => a.data.timestamp > b.data.timestamp ? -1 : 1);
        return orders.map(item => ({
            ...parseOrderData(Object(item.data)),
            id: item.id,
        }));
    }

    public updateOrder = async (order: IOrderItem): Promise<boolean> => {
        const { id, ...rest } = order;
        const res = await FirebaseService.instance.updateDocument('orders', id, Object(rest));
        return res;
    }
}

export default PaymentService;