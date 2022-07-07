export { };

declare global {
    type IObjectId = string | number;

    interface IProducWithoutId {
        name: string,
        description?: string,
        codeFromCompany: string,
        priceFromCompany: number,
        price: number,
        categoryId: string | number,
        rating: number,
        buyersNumber: number,
        colors: IColor[],
        timestamp: number,
    }

    interface IProduct extends IProducWithoutId {
        id: IObjectId,
    }

    interface ICategory {
        id: IObjectId,
        name: string,
        description?: string,
        products?: IProduct[],
    }

    interface ICartItem {
        amount: number,
        product: IProduct,
        color: IColor,
    }

    interface IInvoiceItem {
        items: ICartItem[],
        buyer: IBuyer,
        timestamp: number,
    }
}