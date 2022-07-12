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
    const previewRef = React.useRef<HTMLDivElement>(null);
    const previewWrapperRef = React.useRef<HTMLDivElement>(null);

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

    const handleMouseMoveOnPreviewWrapper = (e: MouseEvent): void => {
        if (previewWrapperRef.current && previewRef.current) {
            previewRef.current.style.width = '160%';
            previewRef.current.style.height = '160%';
            const boundingClientRect = previewWrapperRef.current.getBoundingClientRect();
            const moveX = Math.min(
                Math.max(
                    (e.x - boundingClientRect.x) / previewWrapperRef.current.offsetWidth,
                    0,
                ),
                1,
            );
            const moveY = Math.min(
                Math.max(
                    (e.y - boundingClientRect.y) / previewWrapperRef.current.offsetHeight,
                    0,
                ),
                1,
            );
            previewRef.current.style.left = `${-60 * moveX}%`;
            previewRef.current.style.top = `${-60 * moveY}%`;
        }
    };
    const handleMouseLeaveOnPreviewWrapper = (): void => {
        if (previewWrapperRef.current && previewRef.current) {
            previewRef.current.style.width = '100%';
            previewRef.current.style.height = '100%';
            previewRef.current.style.left = '0%';
            previewRef.current.style.top = '0%';
        }
    };

    const handleImageZoom = (): void => {
        if (previewRef.current && previewWrapperRef.current) {
            previewWrapperRef.current.addEventListener('mousemove', handleMouseMoveOnPreviewWrapper);
            previewWrapperRef.current.addEventListener('mouseleave', handleMouseLeaveOnPreviewWrapper);
        }
    };

    const [activeImage, setActiveImage] = React.useState<string>(images[0] || '');
    const [devidedImages, setDevidedImages] = React.useState<(string[])[]>(devideImageToSlides());

    React.useEffect(() => {
        setDevidedImages(devideImageToSlides());
        setActiveImage(images[0] || '');
    }, [images]);

    React.useEffect(() => {
        handleImageZoom();
        return (): void => {
            if (previewRef.current && previewWrapperRef.current) {
                previewWrapperRef.current.removeEventListener('mousemove', handleMouseMoveOnPreviewWrapper);
                previewWrapperRef.current.removeEventListener('mouseleave', handleMouseLeaveOnPreviewWrapper);
            }
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.previewWrapper} ref={previewWrapperRef}>
                <div
                    ref={previewRef}
                    className={classname([styles.preview])}
                    style={{
                        backgroundImage: `url(${activeImage})`
                    }} />
            </div>
            <Slide
                className={styles.slide}
                items={devidedImages.map((slide, i) =>
                    <ProductSlide
                        key={`slide-${i}`}
                        images={slide}
                        activeImage={activeImage}
                        onSelect={(image): void => {
                            setActiveImage(image);
                        }} />,
                )}
            />
        </div>
    );
};

export default ProductPreview;