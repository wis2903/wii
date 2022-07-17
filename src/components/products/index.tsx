import React from 'react';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Empty from '../basic/empty';
import Pagination from '../pagination';
import Product from '../product/normal-product';
import NormalProductPlaceholder from '../product/normal-product/placeholder';
import styles from './styles.module.scss';

interface IProductsState {
    isLoading: boolean,
    products?: IProduct[],
}
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    data: IProductsState,
}
const numberItemPerPage = 16;

const Products = ({ className, data, children }: IProps): JSX.Element => {
    const [displayedProducts, setDisplayedProducts] = React.useState<IProductsState>({ isLoading: true });
    const [page, setPage] = React.useState<number>(0);
    const resetPaginationFunction = React.useRef<VoidFunction>();

    const updateDisplayedProducts = async (): Promise<void> => {
        setDisplayedProducts({
            isLoading: data.isLoading,
            products: (data.products || []).slice(page * numberItemPerPage, page * numberItemPerPage + numberItemPerPage),
        });
    };

    React.useEffect(() => {
        animateScroll({
            initialPosition: window.scrollY,
            targetPosition: 0,
            duration: 800,
        });
        updateDisplayedProducts();
    }, [page]);

    React.useEffect(() => {
        updateDisplayedProducts();
        if (resetPaginationFunction.current) resetPaginationFunction.current();
    }, [data]);

    return (
        <div className={classname([styles.container, className])}>
            {
                displayedProducts.isLoading
                    ? Array.from({ length: 20 }).map((item, i) =>
                        <NormalProductPlaceholder
                            key={`normal-product-placeholder-${i}`}
                            className={styles.product}
                        />
                    )
                    : (
                        !displayedProducts.products?.length
                            ? <Empty className={styles.empty} message="Không tìm thấy sản phẩm nào." />
                            : displayedProducts.products.map(item =>
                                <Product
                                    key={item.id}
                                    className={styles.product}
                                    data={item}
                                />
                            )
                    )
            }
            {children}

            {
                !!displayedProducts.products?.length
                && (displayedProducts.products?.length || 0) <= (data.products?.length || 0)
                &&
                <Pagination
                    total={data.products?.length || 0}
                    numberItemPerPage={numberItemPerPage}
                    onChange={(p): void => {
                        setPage(p);
                    }}
                    reset={(func): void => {
                        resetPaginationFunction.current = func;
                    }}
                />
            }
        </div>
    );
};

export default Products;