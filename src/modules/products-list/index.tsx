import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../../components/basic/button';
import Product from '../../components/product/normal-product';
import Select from '../../components/basic/select';
import Tab from '../../components/tab';
import styles from './styles.module.scss';
import CategoryService from '../../services/category.service';
import TabPlaceholder from '../../components/tab/placeholder';
import ProductService from '../../services/product.service';
import NormalProductPlaceholder from '../../components/product/normal-product/placeholder';
import { animateScroll } from '../../helpers/dom.helpers';
import SelectPlaceholder from '../../components/basic/select/placeholder';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IProps {
    className?: string,
}
interface ICategoryInfo {
    loadedProducts: boolean,
    data: ICategory,
}
interface ICategoriesState {
    isLoading: boolean,
    cat: ICategoryInfo[],
    activeId: IObjectId,
}
const defaultCategoryId = 'best-seller';

const ProductList = ({ className }: IProps): JSX.Element => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = React.useState<ICategoriesState>({ isLoading: true, cat: [], activeId: searchParams.get('category-id') || defaultCategoryId });
    const [isLoadingMoreProducts, setIsLoadingMoreProducts] = React.useState<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const categoriesRef = React.useRef<ICategoriesState>(categories);

    const getActiveCategory = (categoryId: IObjectId): ICategoryInfo | undefined => {
        return categoriesRef.current.cat.find(item => item.data.id === categoryId) || categoriesRef.current.cat.find(item => item.data.id === defaultCategoryId);
    };

    const fetchData = async (): Promise<void> => {
        await getCategories();

        const activeCategory = getActiveCategory(categoriesRef.current.activeId);
        await getProducts(activeCategory?.data.id || defaultCategoryId);
    };

    const getCategories = async (): Promise<void> => {
        const cats = await CategoryService.instance.list();
        setCategories(current => {
            const res = {
                ...current,
                isLoading: true,
                cat: [
                    {
                        loadedProducts: false,
                        data: {
                            id: defaultCategoryId,
                            name: 'Phổ biến',
                        }
                    },
                    ...cats.map(item => ({
                        loadedProducts: false,
                        data: item,
                    }))
                ],
            };
            categoriesRef.current = res;
            return res;
        });
    };

    const getProducts = async (categoryId: IObjectId): Promise<void> => {
        const products = await ProductService.instance.list({ categoryId });
        const cat = categoriesRef.current.cat.find(item => item.data.id === categoryId);
        if (!cat) return;
        if (!cat.data.products) cat.data.products = products;
        else cat.data.products = cat.data.products.concat(products);
        cat.loadedProducts = true;
        setCategories({
            ...categoriesRef.current,
            isLoading: false,
        });
    };

    const generateProductsEl = (): JSX.Element => {
        const activeCategory = getActiveCategory(categories?.activeId || '');
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
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });
        setCategories(current => ({
            ...current,
            activeId: tab.value,
        }));
        const activeCategory = getActiveCategory(tab.value);
        if (!activeCategory) return;
        if (!activeCategory.loadedProducts) getProducts(tab.value);
    };

    const handleLoadMoreProducts = async (): Promise<void> => {
        setIsLoadingMoreProducts(true);
        await getProducts(categories.activeId);
        setIsLoadingMoreProducts(false);

    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        categoriesRef.current = categories;
    }, [categories]);
    React.useEffect(() => {
        const activeCategory = getActiveCategory(searchParams.get('category-id') || defaultCategoryId);
        if (activeCategory) handleOnTabChange({
            label: activeCategory.data.name,
            value: activeCategory.data.id,
        });
    }, [searchParams.get('category-id')]);

    const activeCategory = getActiveCategory(categories.activeId);

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
                                        selected: activeCategory?.data.id === item.data.id,
                                    }))
                                ]}
                                onChange={(tab: ITabItem): void => {
                                    navigate(`/?category-id=${tab.value}`);
                                }}
                            />
                    }

                    {
                        activeCategory?.loadedProducts
                            ?
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
                            :
                            <SelectPlaceholder />
                    }
                </div>
            </div>
            <br />
            <div className={classname([styles.list, styles.hasPadding])}>
                {generateProductsEl()}

                {
                    activeCategory?.loadedProducts
                    &&
                    <div className={styles.action}>
                        <Button
                            primary
                            label={isLoadingMoreProducts ? 'Đang tải...' : `Xem thêm sản phẩm ${activeCategory.data.name.toLowerCase()}`}
                            onClick={handleLoadMoreProducts}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductList;