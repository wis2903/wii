import React from 'react';
import { classname } from '../../../../helpers/utils.helper';
import Button from '../../../basic/button';
import styles from './styles.module.scss';

interface IProps {
    images: string[],
    onSelect?: (image: string) => void,
    activeImage: string,
}

const ProductSlide = ({ images, activeImage, onSelect }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            {
                images.map((item, i) =>
                    <Button
                        className={classname([styles.item, activeImage === item && styles.active])}
                        key={`slide-item-${i}}`}
                        onClick={(): void => {
                            if (onSelect) onSelect(item);
                        }}
                        style={{
                            backgroundImage: `url(${item})`
                        }}
                    />
                )
            }
        </div>
    );
};

export default ProductSlide;