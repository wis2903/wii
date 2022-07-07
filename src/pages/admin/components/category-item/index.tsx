import React from 'react';
import Button from '../../../../components/basic/button';
import { upperCaseFirstLetter } from '../../../../helpers/utils.helper';
import CategoryService from '../../../../services/category.service';
import ProductService from '../../../../services/product.service';
import UtilsService from '../../../../services/utils.service';
import CategoryPopup from '../category-popup';
import ProductItem from '../product-item';
import ProductPopup from '../product-popup';
import styles from './styles.module.scss';

interface IProps {
    data: ICategory,
}
interface ICategoryPopup {
    isShown: boolean,
    edit?: boolean,
}
interface IProductPopup {
    isShown: boolean,
}

const CategoryItem = ({ data }: IProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const [categoryPopup, setCategoryPopup] = React.useState<ICategoryPopup>({ isShown: false });
    const [productPopup, setProductPopup] = React.useState<IProductPopup>({ isShown: false });
    const [products, setProducts] = React.useState<IProduct[]>([]);

    const handleDeleteCategory = (): void => {
        UtilsService.instance.confirm('Xin vui lòng xác nhận tác vụ: Bạn có chắc chắn muốn xóa danh mục này không?').then(res => {
            if (res) CategoryService.instance.delete(data.id);
        });
    };

    React.useEffect(() => {
        ProductService.instance.list({ categoryId: data.id }).then(res => {
            setProducts(res);
        });
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h3 className={styles.title}>
                        {upperCaseFirstLetter(data.name)}
                        {' '}
                        {!!products.length && `(${products.length})`}
                    </h3>
                    <div className={styles.action}>
                        <Button
                            label='Thêm sản phẩm'
                            icon={{
                                type: 'fa',
                                value: 'fa fa-plus'
                            }}
                            onClick={(): void => {
                                setProductPopup({ isShown: true });
                            }}
                        />
                        <Button
                            label='Xóa'
                            icon={{
                                type: 'fa',
                                value: 'fa fa-minus'
                            }}
                            onClick={handleDeleteCategory}
                        />
                        <Button
                            label='Sửa'
                            icon={{
                                type: 'fa',
                                value: 'fa fa-file-lines'
                            }}
                            onClick={(): void => {
                                setCategoryPopup({ isShown: true, edit: true });
                            }}
                        />
                        <Button
                            icon={{
                                type: 'fa',
                                value: expanded ? 'fa fa-angle-up' : 'fa fa-angle-down'
                            }}
                            onClick={(): void => {
                                setExpanded(!expanded);
                            }}
                        />
                    </div>
                </div>
                {
                    expanded
                    &&
                    <div className={styles.list}>
                        {
                            !products.length
                                ? <div className={styles.empty}>Chưa có sản phẩm trong danh mục</div>
                                : products.map(item =>
                                    <ProductItem data={item} key={item.id} />
                                )
                        }
                    </div>
                }
            </div>
            {
                categoryPopup.isShown
                && <CategoryPopup
                    category={data}
                    onClose={(): void => {
                        setCategoryPopup({ isShown: false });
                    }}
                />
            }
            {
                productPopup.isShown
                && <ProductPopup
                    category={data}
                    onClose={(): void => {
                        setProductPopup({ isShown: false });
                    }}
                    onSuccess={(product): void => {
                        setProducts(current => ([
                            product,
                            ...current,
                        ]));
                    }}
                />
            }
        </>
    );
};

export default CategoryItem;