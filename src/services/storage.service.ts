class StorageService {
    private static inst?: StorageService;

    public static get instance(): StorageService {
        if (!StorageService.inst) StorageService.inst = new StorageService();
        return StorageService.inst;
    }

    public get = async (key: string): Promise<IStorageItemValue> => {
        const res = localStorage.getItem(key);
        if (!res) return undefined;
        try {
            return JSON.parse(res);
        } catch (e) {
            return undefined;
        }
    }

    public set = async (key: string, value: Record<string, unknown> | unknown[]): Promise<void> => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public remove = async (key: string): Promise<void> => {
        localStorage.removeItem(key);
    }
}

export default StorageService;