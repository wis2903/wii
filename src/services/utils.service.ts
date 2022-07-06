class UtilsService {
    private static inst?: UtilsService;
    
    public static get instance(): UtilsService {
        if (!UtilsService.inst) UtilsService.inst = new UtilsService();
        return UtilsService.inst;
    }
}

export default UtilsService;