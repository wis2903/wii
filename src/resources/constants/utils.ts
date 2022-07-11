import { SortEnum } from './enum';

export const sorts: ISelectOption[] = [
    {
        label: 'Mới nhất',
        value: SortEnum.newest,
    },
    {
        label: 'Bán chạy',
        value: SortEnum.buyersDesc,
    },
    {
        label: 'Giá giảm dần',
        value: SortEnum.priceDesc,
    },
    {
        label: 'Giá tăng dần',
        value: SortEnum.priceAsc,
    }
];

export const emptyBuyerInfo = {
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
};