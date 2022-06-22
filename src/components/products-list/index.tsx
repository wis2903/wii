import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import Product from '../product';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    products: IProduct[],
}

const ProductList = ({ className, products }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            {
                products.map(item =>
                    <Product
                        key={item.id}
                        data={item}
                        className={styles.product}
                    />
                )
            }

            <div className={styles.action}>
                <Button primary label='Tải thêm sản phẩm khác' />
            </div>
        </div>
    );
};

export default ProductList;