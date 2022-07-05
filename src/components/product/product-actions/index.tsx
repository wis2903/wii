import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import CartService from '../../../services/cart.service';
import PaymentService from '../../../services/payment.service';
import AmountPicker from '../../amount-picker';
import Button from '../../basic/button';
import ColorPicker from '../../color-picker';
import Price from '../../price';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    product: IProduct,
    onColorChange?: (color: IColor) => void,
}

const ProductActions = ({ className, product, onColorChange }: IProps): JSX.Element => {
    const [amount, setAmount] = React.useState<number>(1);
    const [color, setColor] = React.useState<IColor>(product.colors[0]);

    const handleAddProductToCart = async (): Promise<void> => {
        CartService.instance.add({
            product,
            amount,
            color,
        });
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.head}>
                <h3 className={styles.label}>Đặt hàng</h3>
                <div className={styles.shipping}>Miễn phí vận chuyển toàn quốc</div>
                <div className={styles.shipping}>Thanh toán khi nhận hàng</div>
            </div>

            <div className={styles.colorWrapper}>
                <h4 className={styles.catLabel}>Màu sắc sản phẩm: {color.label}</h4>
                <ColorPicker colors={product.colors} onChange={(c): void => {
                    if(onColorChange) onColorChange(c);
                    setColor(c);
                }} />
            </div>

            <h4 className={styles.catLabel}>Số lượng sản phẩm</h4>
            <div className={styles.amountWrapper}>
                <AmountPicker className={styles.amountPicker} defaultValue={amount} onChange={(value): void => {
                    setAmount(value);
                }} />
                <Price className={styles.price} value={product.price * amount} />
            </div>

            <div className={styles.buttons}>
                <Button primary label='Thêm vào giỏ hàng' onClick={handleAddProductToCart} />
                <Button primary label='Mua ngay' onClick={(): void => {
                    PaymentService.instance.requestShowPoup([{
                        product,
                        amount,
                        color,
                    }]);
                }} />
            </div>
        </div>
    );
};

export default ProductActions;