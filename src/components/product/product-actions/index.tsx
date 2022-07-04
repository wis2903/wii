import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import { colors } from '../../../resources/constants/color';
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
}

const ProductActions = ({ className, product }: IProps): JSX.Element => {
    const [amount, setAmount] = React.useState<number>(1);

    const handleAddProductToCart = async (): Promise<void> => {
        CartService.instance.add({
            product,
            amount,
            color: colors.white,
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
                <h4 className={styles.catLabel}>Màu sắc sản phẩm: Trắng</h4>
                <ColorPicker colors={[
                    {
                        label: 'Đen',
                        value: 'black',
                    },
                    {
                        label: 'Trắng',
                        value: '#ffffff',
                    },
                ]} />
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
                    PaymentService.instance.requestShowPoup();
                }} />
            </div>
        </div>
    );
};

export default ProductActions;