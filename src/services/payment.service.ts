import { parseBuyerData } from '../helpers/data.helper';
import { LocalStorageKeyEnum } from '../resources/constants/enum';
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
}

export default PaymentService;