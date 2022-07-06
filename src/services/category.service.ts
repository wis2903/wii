import EventService from './event.service';

class CategoryService {
    private static inst?: CategoryService;

    public categories: ICategory[];

    constructor() {
        this.categories = [];
    }

    public static get instance(): CategoryService {
        if (!CategoryService.inst) CategoryService.inst = new CategoryService();
        return CategoryService.inst;
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
                EventService.instance.onCategoriesLoaded.trigger();
                resolve(res);
            }, 1000);
        });
    }
}

export default CategoryService;