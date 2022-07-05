import { parseInvoiceData } from '../helpers/data.helper';
import { LocalStorageKeyEnum } from '../resources/constants/enum';
import StorageService from './storage.service';

class InvoiceService {
    private static inst?: InvoiceService;

    public static get instance(): InvoiceService {
        if (!InvoiceService.inst) InvoiceService.inst = new InvoiceService();
        return InvoiceService.inst;
    }

    public list = async (): Promise<IInvoiceItem[]> => {
        const res = await StorageService.instance.get(LocalStorageKeyEnum.invoice);
        if (res instanceof Array) return res.map(item => parseInvoiceData(Object(item)));
        return [];
    }

    public add = async (item: IInvoiceItem): Promise<void> => {
        let allInvoiceItems = await this.list();
        allInvoiceItems = [item, ...allInvoiceItems];
        StorageService.instance.set(LocalStorageKeyEnum.invoice, allInvoiceItems);
    }

    public remove = async (timestamp: number): Promise<void> => {
        let allInvoiceItems = await this.list();
        allInvoiceItems = allInvoiceItems.filter(item => item.timestamp !== timestamp);
        StorageService.instance.set(LocalStorageKeyEnum.invoice, allInvoiceItems);
    }
}

export default InvoiceService;