import React from 'react';
import { classname } from '../../helpers/utils.helper';
import CartService from '../../services/cart.service';
import AmountPicker from '../amount-picker';
import Button from '../basic/button';
import Price from '../price';
import Tooltip from '../tooltip';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: ICartItem,
    smallProductTitle?: boolean,
    onAmountChange?: (value: number) => void,
}

const CartItem = ({ className, data, smallProductTitle, onAmountChange }: IProps): JSX.Element => {
    const handleRemoveItemFromCart = async (): Promise<void> => {
        CartService.instance.remove({ productId: data.product.id, color: data.color.value });
    };
    const handleUpdateItemFromCart = async (value: number): Promise<void> => {
        CartService.instance.update({
            ...data,
            amount: value,
        });
        if (onAmountChange) onAmountChange(value);
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <h3 className={classname([styles.name, smallProductTitle && styles.small])}>{data.product.name}</h3>
                <div className={styles.color}>Màu sắc: {data.color.label}</div>

                <div className={styles.amountWrapper}>
                    <AmountPicker defaultValue={data.amount} onChange={handleUpdateItemFromCart} />
                    <Price className={styles.price} value={data.product.price * data.amount} />
                </div>

                <Tooltip text='Bỏ khỏi giỏ hàng' dir='left' className={styles.removeButtonWrapper}>
                    <Button className={styles.removeButton} onClick={handleRemoveItemFromCart} />
                </Tooltip>
            </div>
        </div>
    );
};

export default CartItem;