class PaymentService {
    private static inst?: PaymentService;
    private showPopupRequests: VoidFunction[];

    constructor() {
        this.showPopupRequests = [];
    }

    public static get instance(): PaymentService {
        if (!PaymentService.inst) PaymentService.inst = new PaymentService();
        return PaymentService.inst;
    }

    public addRequestShowPopupListener = (callback: VoidFunction): void => {
        this.showPopupRequests.push(callback);
    }

    public removeRequestShowPopupListener = (callback: VoidFunction): void => {
        this.showPopupRequests = this.showPopupRequests.filter(item => item !== callback);
    }

    public requestShowPoup = (): void => {
        this.showPopupRequests.forEach(callback => { callback(); });
    }
}

export default PaymentService;