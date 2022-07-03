import React from 'react';
import { classname } from '../../helpers/utils.helper';
import AmountPicker from '../amount-picker';
import Button from '../basic/button';
import Price from '../price';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    productData: IProduct,
    defaultAmount: number,
    smallProductTitle?: boolean,
}

const CartItem = ({ className, productData, defaultAmount, smallProductTitle }: IProps): JSX.Element => {
    const [amount, setAmount] = React.useState<number>(defaultAmount);

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <h3 className={classname([styles.name, smallProductTitle && styles.small])}>{productData.name}</h3>
                <div className={styles.color}>Trắng</div>

                <div className={styles.amountWrapper}>
                    <AmountPicker defaultValue={amount} onChange={(value): void => {
                        setAmount(value);
                    }} />
                    <Price className={styles.price} value={productData.price * amount} />
                </div>

                <Button className={styles.removeButton} label='' />
            </div>
        </div>
    );
};

export default CartItem;