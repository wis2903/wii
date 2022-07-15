import { documentId, where } from 'firebase/firestore';
import { filterProducts, parseProductData, sortProducts } from '../helpers/data.helper';
import { SortEnum } from '../resources/constants/enum';
import FirebaseService from './firebase.service';

interface IGetProductsListRequestParams {
    categoryId: IObjectId,
    sort: SortEnum,
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

    public list = async ({ categoryId, sort }: IGetProductsListRequestParams): Promise<IProduct[]> => {
        let docs = [];
        if (categoryId === 'best-seller') {
            docs = await FirebaseService.instance.getDocuments('products');
        } else {
            docs = await FirebaseService.instance.getDocuments(
                'products',
                where('categoryId', '==', categoryId)
            );
        }
        const products = docs.map(item => ({
            ...parseProductData(item.data),
            id: item.id,
        }));
        return sortProducts(products, sort);
    }

    public filter = async ({ keyword, sort }: IFilterProductsRequestParams): Promise<IProduct[]> => {
        const docs = await FirebaseService.instance.getDocuments('products');
        const products = docs.map(item => ({
            ...parseProductData(item.data),
            id: item.id,
        }));
        return sortProducts(filterProducts(products, keyword), sort);
    }

    public add = async (product: IProducWithoutId): Promise<string | undefined> => {
        const id = await FirebaseService.instance.addDocument('products', { ...product });
        return id;
    }

    public delete = async (productId: string): Promise<void> => {
        await FirebaseService.instance.deleteDocument('products', productId);
    }

    public update = async (product: IProduct): Promise<void> => {
        const { id, ...rest } = product;
        await FirebaseService.instance.updateDocument('products', String(id), Object(rest));
    }

    public getById = async (productId: string): Promise<IProduct | undefined> => {
        const res = await FirebaseService.instance.getDocuments('products', where(documentId(), '==', productId));
        if (res.length) {
            return {
                ...parseProductData(res[0].data),
                id: res[0].id,
            };
        }
        return undefined;
    }

    public getByIds = async (productIds: string[]): Promise<IProduct[]> => {
        const res = await FirebaseService.instance.getDocuments('products', where(documentId(), 'in', productIds));
        if (!res.length) return [];
        return res.map(item => ({
            ...parseProductData(item.data),
            id: item.id,
        }));
    }
}

export default ProductService;