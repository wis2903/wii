import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb';
import Button from '../../components/basic/button';
import Input from '../../components/basic/input';
import Layout from '../../components/layout';
import ProductPreview from '../../components/product/product-images-slideshow';
import Select from '../../components/basic/select';
import Stars from '../../components/stars';
import Wrapper from '../../components/wrapper';
import { formatNumber } from '../../helpers/utils.helper';
import MostPopular from '../../modules/most-popular-list';
import styles from './styles.module.scss';

const Product = (): JSX.Element => {
    return (
        <Layout className={styles.container}>
            <Wrapper>
                <Breadcrumb items={[
                    {
                        label: 'Trang chủ',
                        url: '/',
                    },
                    {
                        label: 'Phụ kiện',
                        url: '/',
                    },
                    {
                        label: 'Quần đùi cộc in chữ - Short lửng cập chung form rộng',
                        url: '/',
                    },
                ]} />
                <div className={styles.mainContent}>
                    <ProductPreview />
                    <div className={styles.info}>
                        <h3 className={styles.name}>Quần đùi cộc in chữ - Short lửng cập chung form rộng</h3>
                        <p className={styles.description}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>

                        <div className={styles.rating}>
                            <Stars rate={3 / 5} />
                            <span className={styles.extra}>52 người mua</span>
                        </div>

                        <div className={styles.extra}>
                            <span className={styles.label}>Danh mục:</span>
                            <Link to="/">Phụ kiện</Link>
                        </div>

                        <div className={styles.extra}>
                            <span className={styles.label}>Vận chuyển:</span>
                            <span>Miễn phí</span>
                        </div>

                        <div className={styles.extra}>
                            <span className={styles.label}>Xuất xứ:</span>
                            <span>Trung Quốc</span>
                        </div>

                        <div className={styles.price}>
                            {formatNumber(199000)} đ
                            <div>
                                <span className={styles.linethrough}>
                                    {formatNumber(199000 * 1.2)} đ
                                </span>
                                <span className={styles.discount}>-20%</span>
                            </div>
                        </div>

                        <div className={styles.inputs}>
                            <Select label="Màu sắc" options={[
                                {
                                    label: 'Trắng',
                                    value: 1,
                                    selected: true,
                                },
                                {
                                    label: 'Xanh',
                                    value: 2,
                                },
                            ]} />
                            <Input className={styles.input} label='Số lượng' defaultValue={1} />
                        </div>

                        <div className={styles.buttons}>
                            <Button label='Mua ngay' className={styles.orange} />
                            <Button primary label='Thêm vào giỏ' />
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <br />
                <br />

                <MostPopular title='Sản phẩm tương tự' />
            </Wrapper>
        </Layout>
    );
};

export default Product;