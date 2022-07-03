class CartService {
    private static inst?: CartService;

    private productAddedListeners: VoidFunction[];
    private requestShowPopupListeners: VoidFunction[];

    constructor() {
        this.productAddedListeners = [];
        this.requestShowPopupListeners = [];
    }

    public static get instance(): CartService {
        if (!CartService.inst) CartService.inst = new CartService();
        return CartService.inst;
    }

    public addProductAddedListener = (callback: VoidFunction): void => {
        this.productAddedListeners.push(callback);
    }

    public removeProductAddedListener = (callback: VoidFunction): void => {
        this.productAddedListeners = this.productAddedListeners.filter(item => item !== callback);
    }

    public requestShowCartNotification = (): void => {
        this.productAddedListeners.forEach(callback => { callback(); });
    }

    public addRequestShowPopupListener = (callback: VoidFunction): void => {
        this.requestShowPopupListeners.push(callback);
    }

    public removeRequestShowPopupListener = (callback: VoidFunction): void => {
        this.requestShowPopupListeners = this.productAddedListeners.filter(item => item !== callback);
    }

    public requestShowPopup = (): void => {
        this.requestShowPopupListeners.forEach(callback => { callback(); });
    }
}

export default CartService;