import { parseCartItemData } from '../helpers/data.helper';
import { LocalStorageKeyEnum } from '../resources/constants/enum';
import EventService from './event.service';
import StorageService from './storage.service';

interface IRemoveItemRequestParams {
    productId: IObjectId,
    color: string
}

class CartService {
    private static inst?: CartService;

    public static get instance(): CartService {
        if (!CartService.inst) CartService.inst = new CartService();
        return CartService.inst;
    }

    public list = async (): Promise<ICartItem[]> => {
        const res = await StorageService.instance.get(LocalStorageKeyEnum.cart);
        if (!res || !(res instanceof Array)) return [];
        return res.map(item => parseCartItemData(Object(item)));
    }

    public add = async ({ productId, color, amount }: ICartItem): Promise<void> => {
        let allCartItems = await this.list();
        const existedItem = allCartItems.find(item => item.productId === productId && item.color.value === color.value);
        if (existedItem) existedItem.amount += amount;
        else allCartItems = [{ productId, amount, color }, ...allCartItems];
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        EventService.instance.onShoppingCartItemsUpdated.trigger();
    }

    public update = async ({ productId, color, amount }: ICartItem): Promise<void> => {
        const allCartItems = await this.list();
        const existedItem = allCartItems.find(item => item.productId === productId && item.color.value === color.value);
        if (!existedItem) return;
        existedItem.amount = amount;
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        EventService.instance.onShoppingCartItemsUpdated.trigger({ withoutNotification: true });
    }

    public remove = async ({ productId, color }: IRemoveItemRequestParams): Promise<void> => {
        let allCartItems = await this.list();
        allCartItems = allCartItems.filter(item => {
            if (item.productId !== productId) return true;
            return item.color.value !== color;
        });
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        EventService.instance.onShoppingCartItemsUpdated.trigger({ withoutNotification: true });
    }

    public removeMultipleItems = async (params: IRemoveItemRequestParams[]): Promise<void> => {
        let allCartItems = await this.list();
        allCartItems = allCartItems.filter(item => {
            if (!params.find(param => param.productId === item.productId)) return true;
            return !params.find(param => param.color === item.color.value);
        });
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        EventService.instance.onShoppingCartItemsUpdated.trigger({ withoutNotification: true });
    }
}

export default CartService;