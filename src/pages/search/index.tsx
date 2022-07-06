import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/basic/button';
import Wrapper from '../../components/basic/wrapper';
import Products from '../../components/products';
import Layout from '../../modules/layout';
import ProductService from '../../services/product.service';
import styles from './styles.module.scss';

interface IProductsState {
    isLoading: boolean,
    data: IProduct[],
}

const SearchPage = (): JSX.Element => {
    const params = useParams();
    const [products, setProducts] = React.useState<IProductsState>({ isLoading: true, data: [] });
    const [isLoadingMoreProducts, setIsLoadingMoreProducts] = React.useState<boolean>(false);

    const getProducts = async (): Promise<void> => {
        setProducts({ isLoading: true, data: [] });
        const res = await ProductService.instance.list({ categoryId: '' });
        setProducts({ isLoading: false, data: res });
    };

    const handleLoadMoreProducts = async (): Promise<void> => {
        setIsLoadingMoreProducts(true);
        const res = await ProductService.instance.list({ categoryId: '' });
        setProducts({
            isLoading: false,
            data: products.data.concat(res),
        });
        setIsLoadingMoreProducts(false);
    };

    React.useEffect(() => {
        getProducts();
    }, [params.keyword]);

    return (
        <Layout className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <h3 className={styles.title}>Kết quả tìm kiếm từ khóa: &#39;{params.keyword}&#39;</h3>

                <Products className={styles.list} data={{
                    isLoading: products.isLoading,
                    products: products.data,
                }}>
                    <div className={styles.action}>
                        <Button
                            primary
                            label={isLoadingMoreProducts ? 'Đang tải...' : 'Xem thêm kết quả'}
                            onClick={handleLoadMoreProducts}
                        />
                    </div>
                </Products>
                <br />
            </Wrapper>
        </Layout>
    );
};

export default SearchPage;