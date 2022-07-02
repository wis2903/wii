import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import ProductPreview from '../../components/product/product-preview';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: () => void,
}

const ProductDetails = ({ className, onClose }: IProps): JSX.Element => {
    return (
        <PopupWrapper className={classname([styles.container, className])} bodyClassName={styles.body} onClose={onClose}>
            <div className={styles.left}>
                <ProductPreview />
            </div>
            <div className={styles.right}>

            </div>
        </PopupWrapper>
    );
};

export default ProductDetails;