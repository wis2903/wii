import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import ProductActions from '../../components/product/product-actions';
import ProductImagesSlideShow from '../../components/product/product-images-slideshow';
import Stars from '../../components/stars';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: () => void,
}

const ProductDetails = ({ className, onClose }: IProps): JSX.Element => {
    return (
        <PopupWrapper className={classname([styles.container, className])} bodyClassName={styles.body} onClose={onClose}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <ProductImagesSlideShow />
                    <h3 className={styles.label}>Hình ảnh chi tiết</h3>
                    <div className={styles.images}>
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <h3 className={styles.name}>Túi Handbag cầm tay đơn giản</h3>
                        <p className={styles.description}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                        <div className={styles.rating}>
                            <Stars rate={3 / 5} />
                            <span className={styles.buyers}>52 người mua</span>
                        </div>
                        <div className={styles.category}>Sản phẩm thuộc danh mục Phụ kiện</div>
                    </div>
                    <ProductActions className={styles.productActions}/>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default ProductDetails;