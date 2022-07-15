export enum LocalStorageKeyEnum {
    cart = 'cart',
    invoice = 'invoice',
    cachedBuyInfo = 'cached-buyer-info',
    cachedAdminAccount = 'cached-admin-account',
}
export enum SortEnum {
    newest = 'newest',
    buyersDesc = 'buyers-desc',
    priceDesc = 'price-desc',
    priceAsc = 'price-asc',
}
export enum AdminHeaderMenuEnum {
    products = 'products',
    orders = 'orders',
}
export enum OrderStatusEnum {
    open = 'open',
    checked = 'checked',
    processing = 'processing',
    processed = 'processed',
    shipped = 'shipped',
    returned = 'returned',
}