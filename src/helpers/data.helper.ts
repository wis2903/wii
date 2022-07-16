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
        productId: String(data.productId),
        color: parseColorData(Object(data.color)),
    };
};

export const parseCartItemWithExtraProductData = (data: Record<string, unknown>): ICartItemWithExtraProductData => {
    return {
        ...parseCartItemData(data),
        productPrice: Number(data.productPrice),
    };
};

export const parseInvoiceData = (data: Record<string, unknown>): IInvoiceItem => {
    return {
        items: data.items instanceof Array ? data.items.map(item => parseCartItemWithExtraProductData(Object(item))) : [],
        buyer: parseBuyerData(Object(data.buyer)),
        timestamp: Number(data.timestamp),
    };
};

export const parseOrderData = (data: Record<string, unknown>): IOrderItem => {
    return {
        ...parseInvoiceData(data),
        id: String(data.id),
        phoneNumber: String(data.phoneNumber),
        status: String(data.status),
        extraInfo: Object(data.extraInfo),
    };
};

export const toLowerCaseNonAccentVietnamese = (text: string): string => {
    let str = text.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
};

export const filterProducts = (products: IProduct[], keyword: string): IProduct[] => {
    if (!keyword) return products;

    try {
        const wordsFromKeyword = toLowerCaseNonAccentVietnamese(keyword.toLowerCase()).split(' ');

        const isWordMatchWord = (word1: string, word2: string): boolean => {
            let matchedCharsNumber = 0;

            for (let i = 0; i < word1.length; i++) {
                const char = word1[i];
                if (
                    word2.toLowerCase().indexOf(char) > -1
                ) matchedCharsNumber += 1;
            }
            return matchedCharsNumber >= (word1.length * 0.8);
        };

        const isProductMatchKeyword = (product: IProduct): boolean => {
            if (String(product.timestamp).indexOf(keyword.toLowerCase()) > -1) return true;

            const wordsFromName = toLowerCaseNonAccentVietnamese(product.name.toLowerCase()).split(' ');
            let numberOfWordFromNameThatIncludedInKeyword = 0;
            wordsFromName.forEach(word1 => {
                let isIncludedInKeyword = false;
                wordsFromKeyword.forEach(word2 => {
                    if (isWordMatchWord(word1, word2)) {
                        isIncludedInKeyword = true;
                    }
                });
                if (isIncludedInKeyword) numberOfWordFromNameThatIncludedInKeyword += 1;
            });

            return numberOfWordFromNameThatIncludedInKeyword >= wordsFromKeyword.length * 0.5;
        };

        return products.filter(item => isProductMatchKeyword(item));
    } catch (e) {
        return [];
    }
};

export const sortProducts = (products: IProduct[], sort: SortEnum | string): IProduct[] => {
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
            case 'rating':
                return a.rating > b.rating ? -1 : 1;
            default: return -1;
        }
    });
};