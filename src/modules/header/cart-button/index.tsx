import React from 'react';
import Tooltip from '../../../components/tooltip';
import { classname } from '../../../helpers/utils.helper';
import CartService from '../../../services/cart.service';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClick?: VoidFunction,
}

const Cart = ({ className, onClick }: IProps): JSX.Element => {
    const [isShowNotification, setIsShowNotification] = React.useState<boolean>(false);
    const [cartItemsNumber, setCartItemsNumber] = React.useState<number>(0);
    const timeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const handleOnAddedProductToCart = (): void => {
        if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        setIsShowNotification(true);
        timeoutHandler.current = setTimeout(() => {
            setIsShowNotification(false);
        }, 3000);
        updateCartItemsNumber();
    };

    const updateCartItemsNumber = async (): Promise<void> => {
        CartService.instance.list().then(res => {
            let totalNumber = 0;
            res.forEach(item => {
                totalNumber += item.amount;
            });
            setCartItemsNumber(totalNumber);
        });
    };

    React.useEffect(() => {
        updateCartItemsNumber();
        CartService.instance.addProductsUpdatedListener(handleOnAddedProductToCart);

        return (): void => {
            CartService.instance.removeProductsUpdatedListener(handleOnAddedProductToCart);
            if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            <Tooltip text='Giỏ hàng' dir='bottom'>
                <button onClick={onClick}>
                    <span className={styles.icon}>
                        <span className='fa fa-cart-shopping' />
                        <span className={styles.indicator}>{cartItemsNumber < 100 ? cartItemsNumber : '99+'}</span>
                    </span>
                </button>
            </Tooltip>

            {
                isShowNotification
                &&
                <span className={styles.notification}>Đã cập nhật giỏ hàng</span>
            }
        </div>
    );
};

export default Cart;