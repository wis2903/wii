import { where } from 'firebase/firestore';
import { parseProductData } from '../helpers/data.helper';
import FirebaseService from './firebase.service';

interface IGetProductsListRequestParams {
    categoryId: IObjectId,
    limit?: number,
    offset?: number,
}

class ProductService {
    private static inst?: ProductService;

    public static get instance(): ProductService {
        if (!ProductService.inst) ProductService.inst = new ProductService();
        return ProductService.inst;
    }

    public list = async ({ categoryId, limit, offset }: IGetProductsListRequestParams): Promise<IProduct[]> => {
        let docs = [];
        if (categoryId === 'best-seller') {
            docs = await FirebaseService.instance.getDocuments('products');
        } else {
            docs = await FirebaseService.instance.getDocuments('products', where('categoryId', '==', categoryId));
        }
        return docs.map(item => ({
            ...parseProductData(item.data),
            id: item.id,
        }));
    }

    public add = async (product: IProducWithoutId): Promise<string | undefined> => {
        const id = await FirebaseService.instance.addDocument('products', { ...product });
        return id;
    }
}

export default ProductService;