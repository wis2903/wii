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
    const timeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const handleOnAddedProductToCart = (): void => {
        if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        setIsShowNotification(true);
        timeoutHandler.current = setTimeout(() => {
            setIsShowNotification(false);
        }, 2000);
    };

    React.useEffect(() => {
        CartService.instance.addProductAddedListener(handleOnAddedProductToCart);

        return (): void => {
            CartService.instance.removeProductAddedListener(handleOnAddedProductToCart);
            if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            <Tooltip text='Giỏ hàng' dir='bottom'>
                <button onClick={onClick}>
                    <span className={styles.icon}>
                        <span className='fa fa-cart-shopping' />
                        <span className={styles.indicator}>0</span>
                    </span>
                </button>
            </Tooltip>

            {
                isShowNotification
                &&
                <span className={styles.notification}>Đã thêm sản phẩm vào giỏ hàng</span>
            }
        </div>
    );
};

export default Cart;