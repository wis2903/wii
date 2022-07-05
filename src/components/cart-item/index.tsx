import React from 'react';
import { classname } from '../../helpers/utils.helper';
import CartService from '../../services/cart.service';
import EventService from '../../services/event.service';
import AmountPicker from '../amount-picker';
import Button from '../basic/button';
import Price from '../price';
import Tooltip from '../basic/tooltip';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: ICartItem,
    smallProductTitle?: boolean,
    onAmountChange?: (value: number) => void,
    disabled?: boolean,
}

const CartItem = ({ className, data, smallProductTitle, onAmountChange, disabled }: IProps): JSX.Element => {
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
    const handleShowProductDetails = (): void => {
        EventService.instance.onRequestShowProductDetails.trigger(data.product);
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <Button
                    className={classname([styles.name, smallProductTitle && styles.small])}
                    label={data.product.name}
                    onClick={handleShowProductDetails}
                />
                <div className={classname([styles.color, disabled && styles.smallMargin])}>Màu sắc: {data.color.label}</div>
                <div className={styles.amountWrapper}>
                    {
                        !disabled
                            ? <AmountPicker defaultValue={data.amount} onChange={handleUpdateItemFromCart} />
                            : <span className={styles.amountDisabled}>Số lượng: {data.amount}</span>

                    }
                    <Price className={styles.price} value={data.product.price * data.amount} />
                </div>

                {
                    !disabled
                    &&
                    <Tooltip text='Bỏ khỏi giỏ hàng' dir='left' className={styles.removeButtonWrapper}>
                        <Button className={styles.removeButton} onClick={handleRemoveItemFromCart} />
                    </Tooltip>
                }
            </div>
        </div>
    );
};

export default CartItem;