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