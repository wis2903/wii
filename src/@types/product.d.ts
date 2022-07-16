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

    interface IProducWithoutId extends IProductBasicInfo {
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
        productId: IObjectId,
        color: IColor,
    }

    interface ICartItemWithExtraProductData extends ICartItem {
        productPrice: number,
    }

    interface IInvoiceItem {
        items: ICartItemWithExtraProductData[],
        buyer: Partial<IBuyer>,
        timestamp: number,
    }

    interface IOrderItemWithoutId extends IInvoiceItem {
        phoneNumber: string,
        status: OrderStatusEnum,
        extraInfo?: Record<string, unknown>,
    }

    interface IOrderItem extends IOrderItemWithoutId {
        id: string,
    }
}