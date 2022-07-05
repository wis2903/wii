import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import Slide from '../../slide';
import ProductSlide from './slide';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    images: string[],
}

const ProductPreview = ({ className, images }: IProps): JSX.Element => {
    const devideImageToSlides = (): (string[])[] => {
        const res: (string[])[] = [];
        images.forEach(item => {
            let makeNewSlide = true;
            res.forEach(slide => {
                if (slide.length < 5) {
                    makeNewSlide = false;
                    slide.push(item);
                }
            });
            if (makeNewSlide) res.push([item]);
        });

        return res;
    };

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.preview} />
            <Slide className={styles.slide} items={devideImageToSlides().map((slide, i) =>
                <ProductSlide key={`slide-${i}`} images={slide} />,
            )} />
        </div>
    );
};

export default ProductPreview;