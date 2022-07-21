import axios from 'axios';
import { filterProducts, parseProductData, sortProducts } from '../helpers/data.helper';
import { getAPIBaseUrl } from '../helpers/utils.helper';
import { SortEnum } from '../resources/constants/enum';
import EventService from './event.service';
import FirebaseService from './firebase.service';

interface IGetProductsListRequestParams {
    categoryId: IObjectId,
    sort: SortEnum,
    passwordHash?: string,
}
interface IFilterProductsRequestParams {
    keyword: string,
    sort: SortEnum,
}

class ProductService {
    private static inst?: ProductService;

    public static get instance(): ProductService {
        if (!ProductService.inst) ProductService.inst = new ProductService();
        return ProductService.inst;
    }

    public list = async ({ categoryId, sort, passwordHash }: IGetProductsListRequestParams): Promise<IProduct[]> => {
        try {
            let url = `${getAPIBaseUrl()}/products?category=${categoryId}`;
            if (passwordHash) url += `&hash=${passwordHash}`;
            const prdsResponse = await axios.get(url);
            if (prdsResponse.data.data instanceof Array) {
                const prds = (prdsResponse.data.data as Record<string, unknown>[]).map(item => parseProductData(item));
                return sortProducts(prds, sort);
            } else {
                return [];
            }
        } catch (e) {
            return [];
        }
    }

    public filter = async ({ keyword, sort }: IFilterProductsRequestParams): Promise<IProduct[]> => {
        const products = await this.list({ categoryId: '', sort: SortEnum.buyersDesc });
        return sortProducts(filterProducts(products, keyword), sort);
    }

    public add = async (product: IProducWithoutId): Promise<string | undefined> => {
        return new Promise(resolve => {
            FirebaseService.instance.addDocument('products', { ...product }).then(id => {
                resolve(id);
            });
        });
    }

    public delete = async (productId: string): Promise<void> => {
        return new Promise(resolve => {
            EventService.instance.onRequestShowLoader.trigger(true);
            FirebaseService.instance.deleteDocument('products', productId).then(() => {
                setTimeout(() => {
                    EventService.instance.onRequestShowLoader.trigger(false);
                    resolve();
                }, 500);
            });
        });
    }

    public update = async (product: IProduct): Promise<void> => {
        return new Promise(resolve => {
            const { id, ...rest } = product;
            FirebaseService.instance.updateDocument('products', String(id), Object(rest)).then(() => {
                resolve();
            });
        });
    }

    public getByIds = async (productIds: string[]): Promise<IProduct[]> => {
        const res = await axios.get(`${getAPIBaseUrl()}/products?id=${productIds.join(',')}`);
        if (!(res.data.data instanceof Array)) return [];
        return (res.data.data as Record<string, unknown>[]).map(item => parseProductData(item));
    }

    public getById = async (productId: string): Promise<IProduct | undefined> => {
        const products = await this.getByIds([productId]);
        return products[0];
    }
}

export default ProductService;