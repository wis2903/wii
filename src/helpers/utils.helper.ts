import moment from 'moment';

export const getTodayInString = (): string => {
    return moment().format('DD/MM/YYYY');
};

export const classname = (classNames: (unknown)[]): string => {
    return classNames.filter(item => !!item).join(' ').trim();
};

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
};

export const getTotalProductsNumberFromCartItems = (cartItems: ICartItem[]): number => {
    let totalNumber = 0;
    cartItems.forEach(item => {
        totalNumber += item.amount;
    });
    return totalNumber;
};

export const getRandomNumber = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
};

export const upperCaseFirstLetter = (str: string): string => {
    try {
        return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
    } catch (e) {
        return str;
    }
};