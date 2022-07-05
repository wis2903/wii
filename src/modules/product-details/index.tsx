import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import ProductActions from '../../components/product/product-actions';
import ProductImagesSlideShow from '../../components/product/product-images-slideshow';
import Stars from '../../components/stars';
import { classname } from '../../helpers/utils.helper';
import EventService from '../../services/event.service';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: () => void,
    data: IProduct,
}

const ProductDetails = ({ className, onClose, data }: IProps): JSX.Element => {
    const [activeColor, setActiveColor] = React.useState<IColor>(data.colors[0]);

    const handleOnRequestShowPayment = (): void => {
        if (onClose) onClose();
    };
    const handleOnShoppingCartUpdated = (): void => {
        if (onClose) onClose();
    };

    React.useEffect(() => {
        EventService.instance.onRequestShowPayment.addEventListener(handleOnRequestShowPayment);
        EventService.instance.onShoppingCartItemsUpdated.addEventListener(handleOnShoppingCartUpdated);

        return (): void => {
            EventService.instance.onRequestShowPayment.removeEventListener(handleOnRequestShowPayment);
            EventService.instance.onShoppingCartItemsUpdated.removeEventListener(handleOnShoppingCartUpdated);
        };
    }, []);

    return (
        <PopupWrapper className={classname([styles.container, className])} bodyClassName={styles.body} onClose={onClose}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <ProductImagesSlideShow images={activeColor.images || []} />
                    {
                        activeColor.images
                        &&
                        <>
                            <h3 className={styles.label}>Hình ảnh chi tiết</h3>
                            <div className={styles.images}>
                                {
                                    activeColor.images.map((item, i) =>
                                        <div key={`image-preview-${i}`} />
                                    )
                                }
                            </div>
                        </>
                    }
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <h3 className={styles.name}>{data.name}</h3>
                        <p className={styles.description}>{data.description}</p>
                        <div className={styles.rating}>
                            <Stars rate={3 / 5} />
                            <span className={styles.buyers}>{data.buyersNumber} người mua</span>
                        </div>
                        <div className={styles.category}>Sản phẩm thuộc danh mục Phụ kiện</div>
                    </div>
                    <ProductActions className={styles.productActions} product={data} onColorChange={(c): void => {
                        setActiveColor(c);
                    }} />
                </div>
            </div>
        </PopupWrapper>
    );
};

export default ProductDetails;