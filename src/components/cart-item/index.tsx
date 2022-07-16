import React from 'react';
import { classname, formatNumber, upperCaseFirstLetter } from '../../helpers/utils.helper';
import CartService from '../../services/cart.service';
import EventService from '../../services/event.service';
import AmountPicker from '../amount-picker';
import Button from '../basic/button';
import Price from '../price';
import Tooltip from '../basic/tooltip';
import styles from './styles.module.scss';
import { getProductThumbnail } from '../../helpers/data.helper';

interface IProps {
    className?: string,
    data: ICartItem | ICartItemWithExtraProductData,
    product: IProduct,
    disabled?: boolean,
    onAmountChange?: (value: number) => void,
    onRemove?: () => void,
}

const CartItem = ({ className, data, product, disabled, onAmountChange, onRemove }: IProps): JSX.Element => {
    const handleRemoveItemFromCart = async (): Promise<void> => {
        CartService.instance.remove({ productId: data.productId, color: data.color.value });
        if (onRemove) onRemove();
    };
    const handleUpdateItemFromCart = async (value: number): Promise<void> => {
        CartService.instance.update({
            ...data,
            amount: value,
        });
        if (onAmountChange) onAmountChange(value);
    };
    const handleShowProductDetails = (): void => {
        if (product.id) EventService.instance.onRequestShowProductDetails.trigger(product);
    };

    return (
        <div className={classname([styles.container, className])}>
            <div
                className={styles.thumbnail}
                style={{
                    backgroundImage: `url(${getProductThumbnail(product, data.color)})`
                }}
            />
            <div className={styles.info}>
                <Button
                    className={classname([styles.name])}
                    label={`${upperCaseFirstLetter(product.name)}`}
                    onClick={handleShowProductDetails}
                />
                {
                    Object(data).productPrice
                    &&
                    <div className={styles.priceAlt}>
                        (Giá tại thời điểm đặt: {formatNumber(Number(Object(data).productPrice))} VND / sản phẩm)
                    </div>
                }
                <div className={classname([styles.color, disabled && styles.smallMargin])}>Màu sắc: {data.color.label}</div>
                <div className={styles.amountWrapper}>
                    {
                        !disabled
                            ? <AmountPicker defaultValue={data.amount} onChange={handleUpdateItemFromCart} />
                            : <span className={styles.amountDisabled}>Số lượng: {data.amount}</span>

                    }
                    <Price
                        className={styles.price}
                        value={
                            Object(data).productPrice
                                ? (Number(Object(data).productPrice) * data.amount)
                                : (product.price * data.amount)
                        }
                    />
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