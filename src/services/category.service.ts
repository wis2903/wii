class CategoryService {
    private static inst?: CategoryService;

    public static get instance(): CategoryService {
        if (!CategoryService.inst) CategoryService.inst = new CategoryService();
        return CategoryService.inst;
    }

    public list = async (): Promise<ICategory[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'bags',
                        name: 'Túi xách',
                    },
                    {
                        id: 'accessories',
                        name: 'Phụ kiện',
                    },
                ]);
            }, 1000);
        });
    }
}

export default CategoryService;