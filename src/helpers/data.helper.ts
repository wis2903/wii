import { SortEnum } from '../resources/constants/enum';

export const getProductThumbnail = (product: IProduct, color?: IColor): string => {
    if (color && color.images) return color.images[0];

    if (!product.colors[0]) return '';
    if (!product.colors[0].images) return '';
    return product.colors[0].images[0];
};

export const parseCategoryData = (data: Record<string, unknown>): ICategory => {
    return {
        id: String(data.id),
        name: String(data.name),
        description: String(data.description),
        timestamp: Number(data.timestamp),
    };
};

export const parseColorData = (data: Record<string, unknown>): IColor => {
    return {
        label: String(data.label),
        value: String(data.value),
        images: data.images instanceof Array ? data.images.map(item => String(item)) : [],
    };
};

export const parseProductAttributeData = (data: Record<string, unknown>): IProductAttribute => {
    return {
        key: String(data.key),
        value: String(data.value),
    };
};

export const parseProductData = (data: Record<string, unknown>): IProduct => {
    return {
        id: String(data.id),
        name: String(data.name),
        description: data.description ? String(data.description) : undefined,
        codeFromCompany: String(data.codeFromCompany),
        code: String(data.code),
        priceFromCompany: Number(data.priceFromCompany),
        price: Number(data.price),
        categoryId: String(data.categoryId),
        rating: Number(data.rating),
        buyersNumber: Number(data.buyersNumber),
        colors: data.colors instanceof Array ? data.colors.map(item => parseColorData(Object(item))) : [],
        timestamp: Number(data.timestamp),
        attributes: data.attributes instanceof Array ? data.attributes.map(item => parseProductAttributeData(item)) : undefined,
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

export const filterProducts = (products: IProduct[], keyword: string): IProduct[] => {
    if (!keyword) return products;

    try {
        const kwrd = keyword.toLowerCase();
        const isProductMatchKeyword = (product: IProduct): boolean => {
            let matchedCharsNumber = 0;
            for (let i = 0; i < kwrd.length; i++) {
                const char = kwrd[i];
                if (
                    product.name.toLowerCase().indexOf(char) > -1
                    || (product.description || '').toLowerCase().indexOf(char) > -1
                    || product.codeFromCompany.toLowerCase().indexOf(char) > -1
                ) matchedCharsNumber += 1;
            }
            return matchedCharsNumber >= (keyword.length * 0.8);
        };

        return products.filter(item => isProductMatchKeyword(item));
    } catch (e) {
        return [];
    }
};

export const sortProducts = (products: IProduct[], sort: SortEnum): IProduct[] => {
    return products.sort((a, b) => {
        switch (sort) {
            case SortEnum.newest:
                return a.timestamp > b.timestamp ? -1 : 1;
            case SortEnum.buyersDesc:
                return a.buyersNumber > b.buyersNumber ? -1 : 1;
            case SortEnum.priceDesc:
                return a.price > b.price ? -1 : 1;
            case SortEnum.priceAsc:
                return a.price < b.price ? -1 : 1;
            default: return -1;
        }
    });
};