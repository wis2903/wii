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

interface ICategoriesState {
    isLoading: boolean,
    data: ICategory[],
}

const CategoriesManagement = (): JSX.Element => {
    const [categories, setCategories] = React.useState<ICategoriesState>({ isLoading: true, data: [] });
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
                        <PageTitle text='Quản lý danh mục sản phẩm' />
                        <Button label='Thêm danh mục mới' primary onClick={(): void => {
                            setIsShowCategoryPopup(true);
                        }} />
                    </div>

                    <div className={styles.mainContent}>
                        {
                            categories.isLoading
                                ? Array.from({ length: 4 }).map((item, i) =>
                                    <CategoryPlaceholder key={`category-placeholder-${i}`} />
                                )
                                : categories.data.map(item =>
                                    <CategoryItem key={item.id} data={item} />
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