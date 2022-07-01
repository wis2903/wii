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
        imageUrls: string[],
    }

    interface ICategory {
        id: IObjectId,
        name: string,
        products?: Iproduct[],
    }
}