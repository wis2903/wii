import React from 'react';
import { classname } from '../../helpers/utils.helper';
import ProductService from '../../services/product.service';
import CartItem from '../cart-item';
import CartItemPlaceholder from '../cart-item/placeholder';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    itemClassName?: string,
    data: ICartItem[] | ICartItemWithExtraProductData[],
    disabledUpdateCartItem?: boolean,
    onRemove?: (item: ICartItem) => void,
    onUpdateAmount?: (item: ICartItem, amount: number) => void,
    onProductsLoaded?: (products: IProduct[]) => void,
}
interface IProductsState {
    isLoading: boolean,
    data: IProduct[],
}

const CartItems = ({ className, itemClassName, data, disabledUpdateCartItem, onProductsLoaded, onRemove, onUpdateAmount }: IProps): JSX.Element => {
    const [products, setProducts] = React.useState<IProductsState>({ isLoading: true, data: [] });

    const generateCartItem = (item: ICartItem): JSX.Element => {
        let product = products.data.find(p => p.id === item.productId);
        if (!product) product = {
            id: '',
            name: 'Không tìm thấy thông tin sản phẩm',
            codeFromCompany: '',
            code: '',
            priceFromCompany: 0,
            price: 0,
            categoryId: -1,
            rating: 0,
            buyersNumber: 0,
            colors: [],
            timestamp: 0,
        };
        return <CartItem
            disabled={disabledUpdateCartItem}
            className={classname([itemClassName])}
            data={item}
            product={product}
            onRemove={(): void => {
                if (onRemove) onRemove(item);
            }}
            onAmountChange={(value): void => {
                if (onUpdateAmount) onUpdateAmount(item, value);
            }}
        />;
    };

    const generateContent = (): JSX.Element => {
        if (products.isLoading) return (
            <div>
                <CartItemPlaceholder className={classname([itemClassName])} />
            </div>
        );

        return (
            <div>
                {data.map((item, i) =>
                    <div className={styles.cartItemWrapper} key={`cart-item-${i}-${item.productId}-${item.color.value}`}>
                        {generateCartItem(item)}
                    </div>
                )}
            </div>
        );
    };

    React.useEffect(() => {
        if (data.length) {
            ProductService.instance.getByIds(data.map(item => String(item.productId))).then(res => {
                setProducts({ isLoading: false, data: res });
                if (onProductsLoaded) onProductsLoaded(res);
            });
        }
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            {generateContent()}
        </div>
    );
};

export default CartItems;