import EventService from './event.service';
import FirebaseService from './firebase.service';

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
        const docs = await FirebaseService.instance.getDocuments('categories');
        const res: ICategory[] = docs.map(item => ({
            id: item.id,
            name: item.data.name,
            description: item.data.description,
        }));
        this.categories = res;
        EventService.instance.onCategoriesLoaded.trigger();
        return res;
    }

    public delete = async (id: IObjectId): Promise<void> => {
        const success = await FirebaseService.instance.deleteDocument('categories', String(id));
        if (success) {
            this.categories = this.categories.filter(item => item.id !== id);
            EventService.instance.onCategoriesLoaded.trigger();
        }
    }

    public add = async (name: string, description?: string): Promise<void> => {
        const id = await FirebaseService.instance.addDocument('categories', { name, description });
        if (id) {
            this.categories.push({ id, name, description });
            EventService.instance.onCategoriesLoaded.trigger();
        }
    }

    public update = async (category: ICategory): Promise<void> => {
        const success = await FirebaseService.instance.updateDocument('categories', String(category.id), {
            name: category.name,
            description: category.description,
        });
        if (success) {
            this.categories = this.categories.map(item => item.id === category.id ? category : item);
            EventService.instance.onCategoriesLoaded.trigger();
        }
    }
}

export default CategoryService;