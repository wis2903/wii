import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Select from '../../components/basic/select';
import Tab from '../../components/basic/tab';
import styles from './styles.module.scss';
import CategoryService from '../../services/category.service';
import TabPlaceholder from '../../components/basic/tab/placeholder';
import ProductService from '../../services/product.service';
import { animateScroll } from '../../helpers/dom.helpers';
import SelectPlaceholder from '../../components/basic/select/placeholder';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sorts } from '../../resources/constants/utils';
import Products from '../../components/products';
import EventService from '../../services/event.service';
import { SortEnum } from '../../resources/constants/enum';

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
    const [sort, setSort] = React.useState<SortEnum>(SortEnum.buyersDesc);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const categoriesRef = React.useRef<ICategoriesState>(categories);

    const handleOnCategoriesLoaded = (): void => {
        fetchData();
    };

    const getActiveCategory = (categoryId: IObjectId): ICategoryInfo | undefined => {
        return categoriesRef.current.cat.find(item => item.data.id === categoryId) || categoriesRef.current.cat.find(item => item.data.id === defaultCategoryId);
    };
    const fetchData = async (): Promise<void> => {
        await getCategories();
        const activeCategory = getActiveCategory(categoriesRef.current.activeId);
        await getProducts(activeCategory?.data.id || defaultCategoryId, sort);
    };
    const getCategories = async (): Promise<void> => {
        const cats = [...CategoryService.instance.categories];
        setCategories(current => {
            const res = {
                ...current,
                isLoading: true,
                cat: [
                    {
                        loadedProducts: false,
                        data: {
                            id: defaultCategoryId,
                            name: 'Ph??? bi???n',
                            timestamp: +new Date(),
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
    const getProducts = async (categoryId: IObjectId, sortType: SortEnum): Promise<void> => {
        const products = await ProductService.instance.list({ categoryId, sort: sortType });
        const cat = categoriesRef.current.cat.find(item => item.data.id === categoryId);
        if (!cat) return;
        cat.data.products = products;
        cat.loadedProducts = true;
        setCategories({
            ...categoriesRef.current,
            isLoading: false,
        });
    };
    const handleOnTabChange = (tab: ITabItem): void => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 500,
        });
        setCategories(current => ({
            ...current,
            activeId: tab.value,
        }));
        categoriesRef.current.activeId = tab.value;
        const activeCategory = getActiveCategory(tab.value);
        if (!activeCategory) return;
        if (!activeCategory.loadedProducts) getProducts(tab.value, sort);
    };
    const handleSortChange = (option: ISelectOption): void => {
        setSort(option.value as SortEnum);
        const tmp = { ...categoriesRef.current };
        tmp.cat.forEach(item => {
            item.loadedProducts = false;
            item.data.products = [];
        });
        setCategories(tmp);
        getProducts(categoriesRef.current.activeId, option.value as SortEnum);
    };

    React.useEffect(() => {
        EventService.instance.onCategoriesLoaded.addEventListener(handleOnCategoriesLoaded);
        return (): void => {
            EventService.instance.onCategoriesLoaded.removeEventListener(handleOnCategoriesLoaded);
        };
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
                                    label='S???p x???p'
                                    options={sorts.map(item => ({
                                        ...item,
                                        selected: item.value === sort,
                                    }))}
                                    onChange={handleSortChange}
                                />
                            </div>
                            :
                            <SelectPlaceholder />
                    }
                </div>
            </div>
            <br />
            <Products
                className={classname([styles.list, styles.hasPadding])}
                data={{
                    isLoading: !activeCategory || !activeCategory.loadedProducts,
                    products: activeCategory?.data.products,
                }}
            />
        </div>
    );
};

export default ProductList;