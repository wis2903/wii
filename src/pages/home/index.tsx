import React from 'react';
import Button from '../../components/button';
import Filter from '../../components/filter';
import MostPopular from '../../components/most-popular-list';
import ProductList from '../../components/products-list';
import Select from '../../components/select';
import Slide from '../../components/slide';
import Tab from '../../components/tab';
import TopRankingProduct from '../../components/top-ranking-product';
import Navigator from '../../components/navigator';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
import FilterIcon from '../../resources/images/filter.png';
import Layout from '../../components/layout';

const Home = (): JSX.Element => {
    const [isShowFilter, setIsShowFilter] = React.useState<boolean>(false);
    const discountProductsRef = React.useRef<HTMLDivElement>(null);
    const advProductsRef = React.useRef<HTMLDivElement>(null);
    const productsListRef = React.useRef<HTMLDivElement>(null);
    const contactRef = React.useRef<HTMLDivElement>(null);

    const toggleFilter = (): void => {
        setIsShowFilter(!isShowFilter);
    };

    return (
        <Layout className={styles.container}>
            <Navigator items={[
                { label: 'Giảm giá', reference: discountProductsRef },
                { label: 'Nổi bật', reference: advProductsRef },
                { label: 'Danh sách sản phẩm', reference: productsListRef },
                { label: 'Liên hệ', reference: contactRef },
            ]} />
            <Wrapper>
                <Slide
                    enableShadow
                    indicatorLeftClassName={styles.slideIndicatorLeft}
                    indicatorRightClassName={styles.slideIndicatorRight}
                    items={[
                        <div key={1} style={{ background: '#e5e5e5', height: '100%' }} />,
                        <div key={2} style={{ background: '#d5d5d5', height: '100%' }} />,
                    ]} />
                <br />
                <br />
                <br />
                <MostPopular reference={discountProductsRef} />
                <br />
                <br />
                <TopRankingProduct
                    reference={advProductsRef}
                    title='Bán chạy nhất tuần qua'
                    data={{
                        id: 'abc',
                        name: 'Túi Handbag cầm tay đơn giản nữ tính',
                        price: 199000
                    }}
                />
                <br />
                <br />
                <TopRankingProduct
                    title='Giảm giá nhiều nhất'
                    data={{
                        id: 'abc',
                        name: 'Túi Handbag cầm tay đơn giản nữ tính',
                        price: 199000
                    }}
                />
                <br />
                <br />
                <br />
                <br />
                <div className={styles.head} ref={productsListRef}>
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
                <br />
                <br />
                <ProductList
                    products={Array.from({ length: 24 }).map((item, i) => ({
                        id: String(i),
                        name: 'Túi Handbag cầm tay đơn giản',
                        price: 199000
                    }))}
                />
                <br />
                <br />
                <br />
                <MostPopular title="Có thể bạn quan tâm" />
                <div ref={contactRef} />
            </Wrapper>
        </Layout>
    );
};

export default Home;