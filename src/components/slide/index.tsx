import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../basic/button';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    indicatorLeftClassName?: string,
    indicatorRightClassName?: string,
    items: JSX.Element[],
    enableShadow?: boolean,
    autoPlay?: boolean,
}
interface IIndexState {
    value: number,
    animation: boolean,
    animating: boolean,
}

const Slide = ({ className, indicatorLeftClassName, indicatorRightClassName, items, enableShadow, autoPlay }: IProps): JSX.Element => {
    const [index, setIndex] = React.useState<IIndexState>({ value: 1, animation: true, animating: false });
    const indexRef = React.useRef<IIndexState>(index);
    const animatingTimeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();
    const autoPlayTimeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const clearTimeoutHandler = (): void => {
        if (animatingTimeoutHandler.current) clearTimeout(animatingTimeoutHandler.current);
        if (autoPlayTimeoutHandler.current) clearTimeout(autoPlayTimeoutHandler.current);
    };

    const handlePrev = (): void => {
        if (indexRef.current.animating) return;
        clearTimeoutHandler();
        const nextIndex = indexRef.current.value - 1;
        setIndex({ value: nextIndex, animation: true, animating: true });
        animatingTimeoutHandler.current = setTimeout(() => {
            if (nextIndex === 0) setIndex({ value: items.length, animation: false, animating: false });
            else setIndex(current => ({ ...current, animating: false }));
            handleAutoPlay();
        }, 350);
    };

    const handleNext = (): void => {
        if (indexRef.current.animating) return;
        clearTimeoutHandler();
        const nextIndex = indexRef.current.value + 1;
        setIndex({ value: nextIndex, animation: true, animating: true });
        animatingTimeoutHandler.current = setTimeout(() => {
            if (nextIndex === items.length + 1) setIndex({ value: 1, animation: false, animating: false });
            else setIndex(current => ({ ...current, animating: false }));
            handleAutoPlay();
        }, 350);
    };

    const handleAutoPlay = (): void => {
        if (autoPlay) {
            autoPlayTimeoutHandler.current = setTimeout(() => {
                handleNext();
            }, 2500);
        }
    };

    React.useEffect(() => {
        handleAutoPlay();
        return clearTimeoutHandler;
    }, []);

    React.useEffect(() => {
        indexRef.current = index;
    }, [index]);

    return (
        <div className={classname([styles.container, className, enableShadow && styles.hasShadow])}>
            {
                items.length > 1
                &&
                <>
                    <Button label='' className={classname([styles.indicator, indicatorLeftClassName, styles.prev])} onClick={handlePrev} />
                    <Button label='' className={classname([styles.indicator, indicatorRightClassName, styles.nxt])} onClick={handleNext} />
                </>
            }
            <div className={styles.wrapper}>
                <div className={classname([styles.mainContent, index.animation && styles.animation])} style={{
                    width: `${(items.length + 2) * 100}%`,
                    marginLeft: `${index.value * -100}%`
                }}>
                    <div style={{
                        width: `${100 / (items.length + 2)}%`
                    }}>{items[items.length - 1]}</div>
                    {
                        items.map(item =>
                            <div key={item.key} style={{
                                width: `${100 / (items.length + 2)}%`
                            }}>{item}</div>
                        )
                    }
                    <div style={{
                        width: `${100 / (items.length + 2)}%`
                    }}>{items[0]}</div>
                </div>
            </div>
        </div>
    );
};

export default Slide;