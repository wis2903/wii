import React from 'react';
import PopupWrapper from '../../components/popup/popup-wrapper';
import ProductActions from '../../components/product/product-actions';
import ProductImagesSlideShow from '../../components/product/product-images-slideshow';
import Stars from '../../components/stars';
import { classname, upperCaseFirstLetter } from '../../helpers/utils.helper';
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
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <h3 className={styles.name}>
                            {data.codeFromCompany} - {upperCaseFirstLetter(data.name)}
                        </h3>
                        <div className={styles.rating}>
                            <Stars rate={data.rating} />
                            <span className={styles.buyers}>{data.buyersNumber} người mua</span>
                        </div>
                        <p className={styles.description}>{data.description}</p>
                        <div className={styles.attributes}>
                            <div className={styles.item}>
                                <span className={styles.label}>- Xuất xứ:</span>
                                <span>Trung Quốc</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.label}>- Kích thước:</span>
                                <span>25 x 15 x 7 (cm)</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.label}>- Chất liệu:</span>
                                <span>Da bò thật</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.label}>- Trọng lượng:</span>
                                <span>1.2 kg</span>
                            </div>
                        </div>
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