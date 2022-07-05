import React from 'react';
import Tooltip from '../../../components/tooltip';
import { classname } from '../../../helpers/utils.helper';
import CartService from '../../../services/cart.service';
import EventService from '../../../services/event.service';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const Cart = ({ className }: IProps): JSX.Element => {
    const [isShowNotification, setIsShowNotification] = React.useState<boolean>(false);
    const [cartItemsNumber, setCartItemsNumber] = React.useState<number>(0);
    const timeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const handleShowShoppingCart = (): void => {
        EventService.instance.onRequestShowShoppingCart.trigger();
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
    const handleShowNotification = (): void => {
        if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        setIsShowNotification(true);
        timeoutHandler.current = setTimeout(() => {
            setIsShowNotification(false);
        }, 3000);
    };
    const handleOnShoppingCartItemsUpdated = (data: unknown): void => {
        updateCartItemsNumber();
        if (data && Object(data).withoutNotification) return;
        handleShowNotification();
    };

    React.useEffect(() => {
        updateCartItemsNumber();
        EventService.instance.onShoppingCartItemsUpdated.addEventListener(handleOnShoppingCartItemsUpdated);

        return (): void => {
            EventService.instance.onShoppingCartItemsUpdated.removeEventListener(handleOnShoppingCartItemsUpdated);
            if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            <Tooltip text='Giỏ hàng' dir='bottom'>
                <button onClick={handleShowShoppingCart}>
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