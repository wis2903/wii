type IShowPopupRequest = (items?: ICartItem[]) => void;

class PaymentService {
    private static inst?: PaymentService;
    private showPopupRequests: IShowPopupRequest[];

    constructor() {
        this.showPopupRequests = [];
    }

    public static get instance(): PaymentService {
        if (!PaymentService.inst) PaymentService.inst = new PaymentService();
        return PaymentService.inst;
    }

    public addRequestShowPopupListener = (callback: IShowPopupRequest): void => {
        this.showPopupRequests.push(callback);
    }

    public removeRequestShowPopupListener = (callback: IShowPopupRequest): void => {
        this.showPopupRequests = this.showPopupRequests.filter(item => item !== callback);
    }

    public requestShowPoup = (items: ICartItem[]): void => {
        this.showPopupRequests.forEach(callback => { callback(items); });
    }
}

export default PaymentService;