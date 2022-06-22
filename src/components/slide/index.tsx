import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    indicatorLeftClassName?: string,
    indicatorRightClassName?: string,
    items: JSX.Element[],
    enableShadow?: boolean,
}

const Slide = ({ className, indicatorLeftClassName, indicatorRightClassName, items, enableShadow }: IProps): JSX.Element => {
    const [index, setIndex] = React.useState<number>(0);

    const handlePrev = (): void => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = (): void => {
        if (index < items.length - 1) setIndex(index + 1);
    };

    return (
        <div className={classname([styles.container, className, enableShadow && styles.hasShadow])}>
            {
                index > 0
                &&
                <Button label='' className={classname([styles.indicator, indicatorLeftClassName, styles.prev])} onClick={handlePrev} />
            }
            {
                index < items.length - 1
                &&
                <Button label='' className={classname([styles.indicator, indicatorRightClassName, styles.nxt])} onClick={handleNext} />
            }
            <div className={styles.wrapper}>
                <div className={styles.mainContent} style={{
                    width: `${items.length * 100}%`,
                    left: `${index * -100}%`
                }}>
                    {
                        items.map(item =>
                            <div key={item.key} style={{
                                width: `${100 / items.length}%`
                            }}>{item}</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Slide;