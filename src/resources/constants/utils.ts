import { AdminHeaderMenuEnum, OrderStatusEnum, SortEnum } from './enum';

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

export const adminHeaderMenu: IAdminHeaderMenuItem[] = [
    {
        label: 'Quản lý sản phẩm',
        id: AdminHeaderMenuEnum.products,
    },
    {
        label: 'Quản lý đơn hàng',
        id: AdminHeaderMenuEnum.orders,
    },
];

export const orderStatuses = [
    {
        title: 'Chưa xử lý',
        value: OrderStatusEnum.open,
    },
    {
        title: 'Đã xác nhận thông tin',
        value: OrderStatusEnum.checked,
    },
    {
        title: 'Đang đặt hàng',
        value: OrderStatusEnum.processing,
    },
    {
        title: 'Đã đặt hàng',
        value: OrderStatusEnum.processed,
    },
    {
        title: 'Đã giao hàng',
        value: OrderStatusEnum.shipped,
    },
    {
        title: 'Khách trả lại hàng',
        value: OrderStatusEnum.returned,
    },
];