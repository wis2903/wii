import React from 'react';
import { classname } from '../../../../helpers/utils.helper';
import Button from '../../../basic/button';
import styles from './styles.module.scss';

interface IProps {
    images: string[],
    onSelect?: (image: string) => void,
}

const ProductSlide = ({ images, onSelect }: IProps): JSX.Element => {
    const [active, setActive] = React.useState<string>(`${images[0]}-0`);

    React.useEffect(() => {
        setActive(`${images[0]}-0`);
        if(onSelect) onSelect(images[0]);
    }, [images]);

    return (
        <div className={styles.container}>
            {
                images.map((item, i) =>
                    <Button
                        className={classname([styles.item, active === `${item}-${i}` && styles.active])}
                        key={`slide-item-${i}}`}
                        onClick={(): void => {
                            setActive(`${item}-${i}`);
                            if (onSelect) onSelect(item);
                        }}
                    />
                )
            }
        </div>
    );
};

export default ProductSlide;