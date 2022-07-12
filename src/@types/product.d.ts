export { };

declare global {
    type IObjectId = string | number;

    interface IProductAttribute {
        key: string,
        value: string,
    }

    interface IProductBasicInfo {
        name: string,
        description?: string,
        codeFromCompany: string,
        code: string,
        priceFromCompany: number,
        price: number,
    }

    interface IProducWithoutId extends IProductBasicInfo{
        categoryId: string | number,
        rating: number,
        buyersNumber: number,
        colors: IColor[],
        timestamp: number,
        attributes?: IProductAttribute[],
    }

    interface IProduct extends IProducWithoutId {
        id: IObjectId,
    }

    interface ICategory {
        id: IObjectId,
        name: string,
        description?: string,
        products?: IProduct[],
        timestamp: number,
    }

    interface ICartItem {
        amount: number,
        product: IProduct,
        color: IColor,
    }

    interface IInvoiceItem {
        items: ICartItem[],
        buyer: Partial<IBuyer>,
        timestamp: number,
    }
}