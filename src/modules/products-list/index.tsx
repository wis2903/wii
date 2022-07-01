import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../../components/button';
import Product from '../../components/normal-product';
import Select from '../../components/select';
import Tab from '../../components/tab';
import styles from './styles.module.scss';
import CategoryService from '../../services/category.service';
import TabPlaceholder from '../../components/tab/placeholder';
import ProductService from '../../services/product.service';
import NormalProductPlaceholder from '../../components/normal-product/placeholder';

interface IProps {
    className?: string,
}
interface ICategoriesState {
    isLoading: boolean,
    cat: {
        loadedProducts: boolean,
        data: ICategory,
    }[],
    activeId?: IObjectId,
}

const ProductList = ({ className }: IProps): JSX.Element => {
    const [categories, setCategories] = React.useState<ICategoriesState>({ isLoading: true, cat: [] });
    const containerRef = React.useRef<HTMLDivElement>(null);
    const categoriesRef = React.useRef<ICategoriesState>(categories);

    const fetchData = async (): Promise<void> => {
        await getCategories();
        await getProducts(-1);
    };

    const getCategories = async (): Promise<void> => {
        const cats = await CategoryService.instance.list();
        setCategories({
            isLoading: true,
            cat: [
                {
                    loadedProducts: false,
                    data: {
                        id: -1,
                        name: 'Phổ biến',
                    }
                },
                ...cats.map(item => ({
                    loadedProducts: false,
                    data: item,
                }))
            ],
            activeId: -1,
        });
    };

    const getProducts = async (categoryId: IObjectId): Promise<void> => {
        ProductService.instance.list({ categoryId }).then(res => {
            const cat = categoriesRef.current.cat.find(item => item.data.id === categoryId);
            if (!cat) return;
            if (!cat.data.products) cat.data.products = res;
            else cat.data.products = cat.data.products.concat(res);
            cat.loadedProducts = true;
            setCategories({
                ...categoriesRef.current,
                isLoading: false,
            });
        });
    };

    const generateProductsEl = (): JSX.Element => {
        const activeCategory = categoriesRef.current.cat.find(item => item.data.id === categories.activeId);
        if (!activeCategory || !activeCategory.loadedProducts || !activeCategory.data.products || !activeCategory.data.products.length) return <>
            {
                Array.from({ length: 20 }).map((item, i) =>
                    <NormalProductPlaceholder
                        key={`normal-product-placeholder-${i}`}
                        className={styles.product}
                    />
                )
            }
        </>;
        return <>
            {
                activeCategory.data.products.map(item =>
                    <Product
                        key={item.id}
                        data={item}
                        className={styles.product}
                    />
                )
            }
        </>;
    };

    const handleOnTabChange = (tab: ITabItem): void => {
        setCategories(current => ({
            ...current,
            activeId: tab.value,
        }));
        const activeCategory = categoriesRef.current.cat.find(item => item.data.id === tab.value);
        if(!activeCategory) return;
        if(!activeCategory.loadedProducts) getProducts(tab.value);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        categoriesRef.current = categories;
    }, [categories]);

    return (
        <div className={classname([className, styles.container])} ref={containerRef}>
            <div className={classname([styles.headerWrapper, styles.fixed])}>
                <div className={styles.head}>
                    {
                        categories.isLoading
                            ? <TabPlaceholder />
                            : <Tab
                                className={styles.tab}
                                items={[
                                    ...categories.cat.map(item => ({
                                        label: item.data.name,
                                        value: item.data.id,
                                        selected: categories.activeId === item.data.id,
                                    }))
                                ]}
                                onChange={handleOnTabChange}
                            />
                    }

                    <div className={styles.actions}>
                        <Select
                            label='Sắp xếp'
                            options={[
                                {
                                    label: 'Giá giảm dần',
                                    value: 1,
                                    selected: true,
                                },
                                {
                                    label: 'Giá tăng dần',
                                    value: 2,
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <br />
            <div className={classname([styles.list, styles.hasPadding])}>
                {generateProductsEl()}

                <div className={styles.action}>
                    <Button primary label='Xem thêm sản phẩm' />
                </div>
            </div>
        </div>
    );
};

export default ProductList;