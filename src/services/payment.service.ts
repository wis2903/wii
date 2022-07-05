class PaymentService {
    private static inst?: PaymentService;

    public static get instance(): PaymentService {
        if (!PaymentService.inst) PaymentService.inst = new PaymentService();
        return PaymentService.inst;
    }
}

export default PaymentService;