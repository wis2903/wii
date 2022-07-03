class CartService {
    private static inst?: CartService;

    private productAddedListeners: VoidFunction[];

    constructor() {
        this.productAddedListeners = [];
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
}

export default CartService;