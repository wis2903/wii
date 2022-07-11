import React from 'react';
import { classname, upperCaseFirstLetter } from '../../../helpers/utils.helper';
import Button from '../../basic/button';
import Price from '../../price';
import ProductWrapper from '../../../modules/product-wrapper';
import Stars from '../../stars';
import styles from './styles.module.scss';
import CartService from '../../../services/cart.service';
import { getProductThumbnail } from '../../../helpers/data.helper';

interface IProps {
    className?: string,
    data: IProduct,
}

const Product = ({ data, className }: IProps): JSX.Element => {
    const handleAddProductToCart = async (): Promise<void> => {
        CartService.instance.add({
            product: data,
            color: data.colors[0],
            amount: 1,
        });
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnailWrapper}>
                <ProductWrapper
                    product={data}
                    className={styles.thumbnail}
                    style={{
                        backgroundImage: `url(${getProductThumbnail(data)})`
                    }}
                />
                <Button className={styles.cartButton} primary icon={{ type: 'fa', value: 'fa fa-cart-plus' }} onClick={handleAddProductToCart} />
            </div>
            <div className={styles.info}>
                <ProductWrapper product={data} className={styles.name}>
                    {data.codeFromCompany} - {upperCaseFirstLetter(data.name)}
                </ProductWrapper>
                <div className={styles.rating}>
                    <Stars rate={data.rating} />
                    <span className={styles.extra}>{data.buyersNumber} người mua</span>
                </div>
                <Price className={styles.price} value={data.price} />
            </div>
        </div>
    );
};

export default Product;