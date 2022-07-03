class CategoryService {
    private static inst?: CategoryService;

    private onLoadedCategoriesListeners: VoidFunction[];

    public categories: ICategory[];

    constructor() {
        this.onLoadedCategoriesListeners = [];
        this.categories = [];
    }

    public static get instance(): CategoryService {
        if (!CategoryService.inst) CategoryService.inst = new CategoryService();
        return CategoryService.inst;
    }

    public addLoadedCategoriesListener = (callback: VoidFunction): void => {
        this.onLoadedCategoriesListeners.push(callback);
    }
    public removeLoadedCategoriesListener = (callback: VoidFunction): void => {
        this.onLoadedCategoriesListeners = this.onLoadedCategoriesListeners.filter(item => item !== callback);
    }
    public triggerOnLoadedCategoriesListeners = (): void => {
        this.onLoadedCategoriesListeners.forEach(callback => { callback(); });
    }

    public list = async (): Promise<ICategory[]> => {
        return new Promise(resolve => {
            const res = [
                {
                    id: 'bags',
                    name: 'Túi xách',
                },
                {
                    id: 'accessories',
                    name: 'Phụ kiện',
                },
            ];
            setTimeout(() => {
                this.categories = res;
                this.triggerOnLoadedCategoriesListeners();
                resolve(res);
            }, 1000);
        });
    }
}

export default CategoryService;