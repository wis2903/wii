import React from 'react';
import Button from '../../../../components/basic/button';
import Wrapper from '../../../../components/basic/wrapper';
import CategoryService from '../../../../services/category.service';
import EventService from '../../../../services/event.service';
import CategoryPopup from '../../components/category-popup';
import CategoryItem from '../../components/category-item';
import PageTitle from '../../components/page-title';
import styles from './styles.module.scss';
import CategoryPlaceholder from '../../components/category-item/placeholder';
import Input from '../../../../components/basic/input';
import SearchIcon from '../../../../resources/images/search.png';

interface ICategoriesState {
    isLoading: boolean,
    data: ICategory[],
}

const CategoriesManagement = (): JSX.Element => {
    const [categories, setCategories] = React.useState<ICategoriesState>({ isLoading: true, data: [] });
    const [keyword, setKeyword] = React.useState<string>('');
    const [isShowCategoryPopup, setIsShowCategoryPopup] = React.useState<boolean>(false);

    const handleOnCategoriesLoaded = (): void => {
        setCategories({
            isLoading: false,
            data: CategoryService.instance.categories,
        });
    };

    React.useEffect(() => {
        EventService.instance.onCategoriesLoaded.addEventListener(handleOnCategoriesLoaded);
        return (): void => {
            EventService.instance.onCategoriesLoaded.removeEventListener(handleOnCategoriesLoaded);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Wrapper className={styles.wrapper}>
                    <div className={styles.head}>
                        <PageTitle text='Quản lý sản phẩm' />
                        <div className={styles.right}>
                            <Input
                                className={styles.search}
                                label='Tìm kiếm sản phẩm...'
                                icon={{
                                    type: 'image',
                                    value: SearchIcon,
                                }}
                                onValueChange={(value): void => {
                                    setKeyword(value);
                                }}
                            />
                            <Button label='Thêm danh mục' primary onClick={(): void => {
                                setIsShowCategoryPopup(true);
                            }} />
                        </div>
                    </div>

                    <div className={styles.mainContent}>
                        {
                            categories.isLoading
                                ? Array.from({ length: 4 }).map((item, i) =>
                                    <CategoryPlaceholder key={`category-placeholder-${i}`} />
                                )
                                : categories.data.map(item =>
                                    <CategoryItem key={item.id} data={item} keyword={keyword} />
                                )
                        }
                    </div>
                </Wrapper>
            </div>
            {
                isShowCategoryPopup
                && <CategoryPopup
                    onClose={(): void => {
                        setIsShowCategoryPopup(false);
                    }}
                />
            }
        </>
    );
};

export default CategoriesManagement;