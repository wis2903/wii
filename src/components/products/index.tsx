import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Empty from '../basic/empty';
import Product from '../product/normal-product';
import NormalProductPlaceholder from '../product/normal-product/placeholder';
import styles from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    data: {
        isLoading: boolean,
        products?: IProduct[],
    },
}

const Products = ({ className, data, children }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            {
                data.isLoading
                    ? Array.from({ length: 20 }).map((item, i) =>
                        <NormalProductPlaceholder
                            key={`normal-product-placeholder-${i}`}
                            className={styles.product}
                        />
                    )
                    : (
                        !data.products?.length
                            ? <Empty className={styles.empty} message="Không tìm thấy sản phẩm nào."/>
                            : data.products.map(item =>
                                <Product
                                    key={item.id}
                                    className={styles.product}
                                    data={item}
                                />
                            )
                    )
            }
            {children}
        </div>
    );
};

export default Products;