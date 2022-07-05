export const parseCategoryData = (data: Record<string, unknown>): ICategory => {
    return {
        id: String(data.id),
        name: String(data.name),
    };
};

export const parseColorData = (data: Record<string, unknown>): IColor => {
    return {
        label: String(data.label),
        value: String(data.value),
        images: data.images instanceof Array ? data.images.map(item => String(item)) : [],
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
        colors: data.colors instanceof Array ? data.colors.map(item => parseColorData(Object(item))) : [],
    };
};

export const parseBuyerData = (data: Record<string, unknown>): IBuyer => {
    return {
        name: String(data.name),
        phoneNumber: String(data.phoneNumber),
        email: String(data.email),
        address: String(data.address),
    };
};

export const parseCartItemData = (data: Record<string, unknown>): ICartItem => {
    return {
        amount: Number(data.amount),
        product: parseProductData(Object(data.product)),
        color: parseColorData(Object(data.color)),
    };
};

export const parseInvoiceData = (data: Record<string, unknown>): IInvoiceItem => {
    return {
        items: data.items instanceof Array ? data.items.map(item => parseCartItemData(Object(item))) : [],
        buyer: parseBuyerData(Object(data.buyer)),
        timestamp: Number(data.timestamp),
    };
};