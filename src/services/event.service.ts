type IEventListener = (data?: unknown) => void

class EventHandler {
    private eventListeners: IEventListener[];
    private name: string;

    constructor(nm: string) {
        this.eventListeners = [];
        this.name = nm;
    }

    public addEventListener = (callback: IEventListener): void => {
        this.eventListeners.push(callback);
    }

    public removeEventListener = (callback: IEventListener): void => {
        this.eventListeners = this.eventListeners.filter(item => item !== callback);
    }

    public trigger = (data?: unknown): void => {
        this.eventListeners.forEach(callback => { callback(data); });
    }
}

class EventService {
    private static inst?: EventService;
    public onRequestShowProductDetails: EventHandler;
    public onRequestShowShoppingCart: EventHandler;
    public onShoppingCartItemsUpdated: EventHandler;
    public onRequestShowPayment: EventHandler;
    public onPaymentSuccess: EventHandler;
    public onRequestShowInvoiceDetails: EventHandler;
    public onCategoriesLoaded: EventHandler;
    public onRequestShowConfirmation: EventHandler;
    public onAnswerTheConfirmation: EventHandler;

    constructor() {
        this.onRequestShowProductDetails = new EventHandler('on-request-show-product-details');
        this.onRequestShowShoppingCart = new EventHandler('on-request-show-shopping-cart');
        this.onShoppingCartItemsUpdated = new EventHandler('on-shopping-cart-items-updated');
        this.onRequestShowPayment = new EventHandler('on-request-show-payment');
        this.onPaymentSuccess = new EventHandler('on-payment-success');
        this.onRequestShowInvoiceDetails = new EventHandler('on-request-show-invoice-details');
        this.onCategoriesLoaded = new EventHandler('on-categories-loaded');
        this.onRequestShowConfirmation = new EventHandler('on-request-show-confirmation');
        this.onAnswerTheConfirmation = new EventHandler('on-answer-the-confirmation');
    }

    public static get instance(): EventService {
        if (!EventService.inst) EventService.inst = new EventService();
        return EventService.inst;
    }
}

export default EventService;