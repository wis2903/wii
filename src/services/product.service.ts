import { mockUpProduct } from '../mockup/product.mockup';

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

    public list = async ({categoryId, limit, offset}: IGetProductsListRequestParams): Promise<IProduct[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Array.from({ length: 20 }).map((item, i) => ({...mockUpProduct, categoryId, id: String(i)})));
            }, 1000);
        });

        return [];
    }
}

export default ProductService;