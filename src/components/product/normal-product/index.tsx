import React from 'react';
import { classname, upperCaseFirstLetter } from '../../../helpers/utils.helper';
import Price from '../../price';
import ProductWrapper from '../../../modules/product-wrapper';
import Stars from '../../stars';
import styles from './styles.module.scss';
import Slide from '../../slide';

interface IProps {
    className?: string,
    data: IProduct,
}

const Product = ({ data, className }: IProps): JSX.Element => {
    let images: string[] = [];
    data.colors.forEach(c => {
        images = images.concat(c.images || []);
    });
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.thumbnailWrapper}>
                <Slide
                    indicatorLeftClassName={styles.slideIndicatorLeft}
                    indicatorRightClassName={styles.slideIndicatorRight}
                    items={images.map((item, i) =>
                        <ProductWrapper
                            key={`${item}`}
                            product={data}
                            className={styles.thumbnail}
                            style={{
                                backgroundImage: i === activeIndex ? `url(${item})` : ''
                            }}
                        />
                    )}
                    onChange={(ix): void => {
                        setActiveIndex(ix);
                    }}
                />
            </div>
            <div className={styles.info}>
                <ProductWrapper product={data} className={styles.name}>
                    {upperCaseFirstLetter(data.name)}
                </ProductWrapper>
                <div className={styles.rating}>
                    <Stars rate={data.rating} />
                    <span className={styles.extra}>{data.buyersNumber} người mua</span>
                </div>
                <Price className={styles.price} value={data.price} />
            </div>
        </div>
    );
};

export default Product;