import React from 'react';
import Button from '../../../../components/basic/button';
import { filterProducts } from '../../../../helpers/data.helper';
import { upperCaseFirstLetter } from '../../../../helpers/utils.helper';
import { SortEnum } from '../../../../resources/constants/enum';
import CategoryService from '../../../../services/category.service';
import ProductService from '../../../../services/product.service';
import UtilsService from '../../../../services/utils.service';
import CategoryPopup from '../category-popup';
import ProductItem from '../product-item';
import ProductPopup from '../product-popup';
import styles from './styles.module.scss';

interface IProps {
    data: ICategory,
    keyword?: string,
}
interface ICategoryPopup {
    isShown: boolean,
    edit?: boolean,
}
interface IProductPopup {
    isShown: boolean,
    product?: IProduct,
}

const CategoryItem = ({ data, keyword }: IProps): JSX.Element => {
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
        ProductService.instance.list({ categoryId: data.id, sort: SortEnum.newest }).then(res => {
            setProducts(res);
        });
    }, []);

    const filteredProducts = filterProducts(products, keyword || '');

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h3 className={styles.title}>
                        {upperCaseFirstLetter(data.name)}
                        {' '}
                        {!!filteredProducts.length && `(${filteredProducts.length})`}
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
                                value: 'fa fa-pen'
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
                            !filteredProducts.length
                                ? <div className={styles.empty}>Không tìm thấy sản phẩm nào</div>
                                : filteredProducts.map(item =>
                                    <ProductItem
                                        data={item}
                                        key={item.id}
                                        onDelete={(): void => {
                                            setProducts(current => current.filter(p => p.id !== item.id));
                                        }}
                                        onUpdate={(): void => {
                                            setProductPopup({ isShown: true, product: item });
                                        }}
                                    />
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
                    product={productPopup.product}
                    onClose={(): void => {
                        setProductPopup({ isShown: false });
                    }}
                    onAdded={(product): void => {
                        setProducts(current => ([
                            product,
                            ...current,
                        ]));
                    }}
                    onUpdated={(product): void => {
                        setProducts(current => current.map(item => item.id === product.id ? product : item));
                    }}
                />
            }
        </>
    );
};

export default CategoryItem;