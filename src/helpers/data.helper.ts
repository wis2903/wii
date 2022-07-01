export const parseCategoryData = (data: Record<string, unknown>): ICategory => {
    return {
        id: String(data.id),
        name: String(data.name),
    };
};

export const parseProductData = (data: Record<string, unknown>): IProduct => {
    return {
        id: String(data.id),
        name: String(data.name),
        description: data.description ? String(data.description) : undefined,
        price: Number(data.price),
        categoryId: String(data.category_id),
        rating: Number(data.rating),
        buyersNumber: Number(data.buyers_number),
        imageUrls: data.images instanceof Array ? data.images.map(item => String(item)) : [],
    };
};