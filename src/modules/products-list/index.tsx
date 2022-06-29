import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../../components/button';
import Product from '../../components/normal-product';
import Select from '../../components/select';
import Tab from '../../components/tab';
import FilterIcon from '../../resources/images/filter.png';
import styles from './styles.module.scss';
import Filter from '../../components/filter';

interface IProps {
    className?: string,
    products: IProduct[],
}

const ProductList = ({ className, products }: IProps): JSX.Element => {
    const [isShowFilter, setIsShowFilter] = React.useState<boolean>(false);
    const [isFixedHeader, setIsFixedHeader] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const toggleFilter = (): void => {
        setIsShowFilter(!isShowFilter);
    };

    const handleOnWindowScroll = (): void => {
        if (ref.current && window.scrollY >= ref.current.offsetTop - 76) {
            setIsFixedHeader(true);
        } else {
            setIsFixedHeader(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleOnWindowScroll);

        return (): void => {
            window.removeEventListener('scroll', handleOnWindowScroll);
        };
    }, []);

    return (
        <div className={classname([className, styles.container])} ref={ref}>
            <div className={classname([styles.headerWrapper, isFixedHeader && styles.fixed])}>
                <div className={styles.head}>
                    <Tab
                        className={styles.tab}
                        items={[
                            {
                                label: 'Phổ biến',
                                value: -1,
                                selected: true,
                            },
                            {
                                label: 'Mẹ và bé',
                                value: 1,
                            },
                            {
                                label: 'Túi xách',
                                value: 2,
                            },
                            {
                                label: 'Giầy dép',
                                value: 3,
                            },
                            {
                                label: 'Đồng hồ',
                                value: 4,
                            }
                        ]}
                    />

                    <div className={styles.actions}>
                        <Select
                            label='Sắp xếp'
                            options={[
                                {
                                    label: 'Mới đến cũ',
                                    value: -1,
                                    selected: true,
                                },
                                {
                                    label: 'Cũ đến mới',
                                    value: -2,
                                },
                                {
                                    label: 'Giá giảm dần',
                                    value: 1,
                                },
                                {
                                    label: 'Giá tăng dần',
                                    value: 2,
                                }
                            ]}
                        />
                        <Button label='Bộ lọc' icon={FilterIcon} onClick={toggleFilter} />
                    </div>
                </div>
                {
                    isShowFilter
                    &&
                    <Filter className={styles.filter} onClose={toggleFilter} />
                }
            </div>
            <br />
            <br />
            <div className={classname([styles.list, isFixedHeader && styles.hasPadding, isShowFilter && styles.hasFilter])}>
                {
                    products.map(item =>
                        <Product
                            key={item.id}
                            data={item}
                            className={styles.product}
                        />
                    )
                }

                <div className={styles.action}>
                    <Button primary label='Xem thêm sản phẩm' />
                </div>
            </div>
        </div>
    );
};

export default ProductList;