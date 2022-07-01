class BaseService {
    private static inst?: BaseService;
    public static get instance(): BaseService {
        if (!BaseService.inst) BaseService.inst = new BaseService();
        return BaseService.inst;
    }
}

export default BaseService;