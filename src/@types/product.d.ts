export { };

declare global {
    type IObjectId = string | number;

    interface IProduct {
        id: IObjectId,
        name: string,
        description?: string,
        price: number,
        categoryId: string | number,
        categoryData?: ICategory,
        rating: number,
        buyersNumber: number,
        colors: IColor[],
    }

    interface ICategory {
        id: IObjectId,
        name: string,
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