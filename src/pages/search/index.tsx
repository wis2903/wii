import React from 'react';
import { useParams } from 'react-router-dom';
import Select from '../../components/basic/select';
import Wrapper from '../../components/basic/wrapper';
import Products from '../../components/products';
import Layout from '../../modules/layout';
import { SortEnum } from '../../resources/constants/enum';
import { sorts } from '../../resources/constants/utils';
import ProductService from '../../services/product.service';
import styles from './styles.module.scss';

interface IProductsState {
    isLoading: boolean,
    data: IProduct[],
}

const SearchPage = (): JSX.Element => {
    const params = useParams();
    const [products, setProducts] = React.useState<IProductsState>({ isLoading: true, data: [] });
    const [keyword, setKeyword] = React.useState<string>('');
    const [sort, setSort] = React.useState<SortEnum>(SortEnum.newest);

    const handleSortChange = (option: ISelectOption): void => {
        setSort(option.value as SortEnum);
        getProducts(keyword, option.value as SortEnum);
    };

    const getProducts = async (kwrd: string, srt: SortEnum): Promise<void> => {
        setProducts({ isLoading: true, data: [] });
        const res: IProduct[] = await ProductService.instance.filter({ keyword: kwrd, sort: srt });
        setProducts({ isLoading: false, data: res });
    };

    React.useEffect(() => {
        setKeyword(String(params.keyword));
    }, []);
    React.useEffect(() => {
        setKeyword(String(params.keyword));
    }, [params.keyword]);
    React.useEffect(() => {
        if (keyword) {
            getProducts(keyword, sort);
        }
    }, [keyword]);

    return (
        <Layout className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <div className={styles.head}>
                    <h3 className={styles.title}>Kết quả tìm kiếm từ khóa: &#39;{params.keyword}&#39;</h3>
                    {
                        !products.isLoading
                        && <Select
                            label='Sắp xếp'
                            options={sorts.map(item => ({
                                ...item,
                                selected: item.value === sort,
                            }))}
                            onChange={handleSortChange}
                        />
                    }
                </div>

                <Products className={styles.list} data={{
                    isLoading: products.isLoading,
                    products: products.data,
                }}></Products>
                <br />
            </Wrapper>
        </Layout>
    );
};

export default SearchPage;