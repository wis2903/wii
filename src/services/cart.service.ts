import { LocalStorageKeyEnum } from '../resources/constants/enum';
import StorageService from './storage.service';

class CartService {
    private static inst?: CartService;

    private productsUpdatedListeners: VoidFunction[];
    private requestShowPopupListeners: VoidFunction[];

    constructor() {
        this.productsUpdatedListeners = [];
        this.requestShowPopupListeners = [];
    }

    public static get instance(): CartService {
        if (!CartService.inst) CartService.inst = new CartService();
        return CartService.inst;
    }

    public addProductsUpdatedListener = (callback: VoidFunction): void => {
        this.productsUpdatedListeners.push(callback);
    }

    public removeProductsUpdatedListener = (callback: VoidFunction): void => {
        this.productsUpdatedListeners = this.productsUpdatedListeners.filter(item => item !== callback);
    }

    public requestShowCartNotification = (): void => {
        this.productsUpdatedListeners.forEach(callback => { callback(); });
    }

    public addRequestShowPopupListener = (callback: VoidFunction): void => {
        this.requestShowPopupListeners.push(callback);
    }

    public removeRequestShowPopupListener = (callback: VoidFunction): void => {
        this.requestShowPopupListeners = this.productsUpdatedListeners.filter(item => item !== callback);
    }

    public requestShowPopup = (): void => {
        this.requestShowPopupListeners.forEach(callback => { callback(); });
    }

    public list = async (): Promise<ICartItem[]> => {
        const res = await StorageService.instance.get(LocalStorageKeyEnum.cart);
        if (!res || !(res instanceof Array)) return [];
        return res;
    }

    public add = async ({ product, color, amount }: ICartItem): Promise<void> => {
        let allCartItems = await this.list();
        const existedItem = allCartItems.find(item => item.product.id === product.id && item.color.value === color.value);
        if (existedItem) existedItem.amount += amount;
        else allCartItems = [{ product, amount, color }, ...allCartItems];
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        this.requestShowCartNotification();
    }

    public update = async ({ product, color, amount }: ICartItem): Promise<void> => {
        const allCartItems = await this.list();
        const existedItem = allCartItems.find(item => item.product.id === product.id && item.color.value === color.value);
        if (!existedItem) return;
        existedItem.amount = amount;
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        this.requestShowCartNotification();
    }

    public remove = async ({ productId, color }: { productId: IObjectId, color: string }): Promise<void> => {
        let allCartItems = await this.list();
        allCartItems = allCartItems.filter(item => {
            if(item.product.id !== productId) return true;
            return item.color.value !== color;
        });
        await StorageService.instance.set(LocalStorageKeyEnum.cart, allCartItems);
        this.requestShowCartNotification();
    }
}

export default CartService;