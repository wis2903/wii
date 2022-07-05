import { colors } from '../resources/constants/color';

export const mockUpProduct: IProduct = {
    id: String(Math.random()),
    name: 'Túi Handbag cầm tay đơn giản',
    description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    price: 199000,
    categoryId: '',
    buyersNumber: 10,
    rating: 4 / 5,
    colors: [
        {
            ...colors.white,
            images: ['', '', '', ''],
        },
        {
            ...colors.black,
            images: ['', '', '', '', '', '', ''],
        },
    ],
};