import axios from 'axios';
import { parseCategoryData } from '../helpers/data.helper';
import { getAPIBaseUrl } from '../helpers/utils.helper';
import { SortEnum } from '../resources/constants/enum';
import EventService from './event.service';
import ProductService from './product.service';

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
        if (this.categories.length) {
            EventService.instance.onCategoriesLoaded.trigger();
            return this.categories;
        }

        const response = await axios.get(`${getAPIBaseUrl()}/categories`);
        const docs = response.data.data;
        if (!(docs instanceof Array)) return [];
        const res: ICategory[] = docs.map(item => parseCategoryData(item));
        this.categories = res.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
        EventService.instance.onCategoriesLoaded.trigger();
        return this.categories;
    }

    public delete = async (id: IObjectId): Promise<void> => {
        return new Promise(resolve => {
            const exec = async (): Promise<void> => {
                EventService.instance.onRequestShowLoader.trigger(true);
                const success = await axios.delete(`${getAPIBaseUrl()}/category?id=${String(id)}`);
                if (success) {
                    this.categories = this.categories.filter(item => item.id !== id);
                    const productsIncategory = await ProductService.instance.list({ categoryId: String(id), sort: SortEnum.newest });
                    for (let i = 0; i < productsIncategory.length; i++) {
                        await ProductService.instance.delete(String(productsIncategory[i].id));
                    }
                }
                setTimeout(() => {
                    EventService.instance.onRequestShowLoader.trigger(false);
                    EventService.instance.onCategoriesLoaded.trigger();
                    resolve();
                }, 500);
            };

            exec();
        });
    }

    public add = async (name: string, description?: string): Promise<void> => {
        return new Promise(resolve => {
            const exec = async (): Promise<void> => {
                EventService.instance.onRequestShowLoader.trigger(true);
                const response = await axios.post(`${getAPIBaseUrl()}/category`, {
                    name,
                    description,
                    timestamp: +new Date(),
                });
                const id = response.data.data;
                if (id) this.categories.push({ id, name, description, timestamp: +new Date() });
                setTimeout(() => {
                    EventService.instance.onRequestShowLoader.trigger(false);
                    EventService.instance.onCategoriesLoaded.trigger();
                    resolve();
                }, 500);
            };
            exec();
        });
    }

    public update = async (category: ICategory): Promise<void> => {
        return new Promise(resolve => {
            const exec = async (): Promise<void> => {
                EventService.instance.onRequestShowLoader.trigger(true);
                const { id, name, description } = category;
                const response = await axios.put(`${getAPIBaseUrl()}/category`, { id, name, description });
                const success = response.data.data;
                if (success) this.categories = this.categories.map(item => item.id === category.id ? category : item);

                setTimeout(() => {
                    EventService.instance.onRequestShowLoader.trigger(false);
                    EventService.instance.onCategoriesLoaded.trigger();
                    resolve();
                }, 500);
            };
            exec();
        });
    }
}

export default CategoryService;