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
    loop?: boolean,
}
interface IIndexState {
    value: number,
    animation: boolean,
    animating: boolean,
}

const Slide = ({ className, indicatorLeftClassName, indicatorRightClassName, items, enableShadow, autoPlay, loop }: IProps): JSX.Element => {
    const [index, setIndex] = React.useState<IIndexState>({ value: loop ? 1 : 0, animation: true, animating: false });
    const indexRef = React.useRef<IIndexState>(index);
    const animatingTimeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();
    const autoPlayTimeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const clearTimeoutHandler = (): void => {
        if (animatingTimeoutHandler.current) clearTimeout(animatingTimeoutHandler.current);
        if (autoPlayTimeoutHandler.current) clearTimeout(autoPlayTimeoutHandler.current);
    };

    const handlePrev = (): void => {
        if (loop) {
            if (indexRef.current.animating) return;
            clearTimeoutHandler();
            const nextIndex = indexRef.current.value - 1;
            setIndex({ value: nextIndex, animation: true, animating: true });
            animatingTimeoutHandler.current = setTimeout(() => {
                if (nextIndex === 0) setIndex({ value: items.length, animation: false, animating: false });
                else setIndex(current => ({ ...current, animating: false }));
                handleAutoPlay();
            }, 350);
        } else {
            if (index.value <= 0) return;
            else {
                clearTimeoutHandler();
                setIndex(current => ({
                    ...current,
                    value: index.value - 1
                }));
                handleAutoPlay();
            }
        }
    };

    const handleNext = (): void => {
        if (loop) {
            if (indexRef.current.animating) return;
            clearTimeoutHandler();
            const nextIndex = indexRef.current.value + 1;
            setIndex({ value: nextIndex, animation: true, animating: true });
            animatingTimeoutHandler.current = setTimeout(() => {
                if (nextIndex === items.length + 1) setIndex({ value: 1, animation: false, animating: false });
                else setIndex(current => ({ ...current, animating: false }));
                handleAutoPlay();
            }, 350);
        } else {
            if (index.value >= items.length - 1) return;
            else {
                clearTimeoutHandler();
                setIndex(current => ({
                    ...current,
                    value: index.value + 1,
                }));
                handleAutoPlay();
            }
        }
    };

    const handleAutoPlay = (): void => {
        if (autoPlay) {
            autoPlayTimeoutHandler.current = setTimeout(() => {
                handleNext();
            }, 2500);
        }
    };

    const generateIndicatorButtons = (): JSX.Element | undefined => {
        if (loop && items.length > 1) return (
            <>
                <Button label='' className={classname([styles.indicator, indicatorLeftClassName, styles.prev])} onClick={handlePrev} />
                <Button label='' className={classname([styles.indicator, indicatorRightClassName, styles.nxt])} onClick={handleNext} />
            </>

        );

        return (
            <>
                {
                    index.value > 0
                    && <Button label='' className={classname([styles.indicator, indicatorLeftClassName, styles.prev])} onClick={handlePrev} />
                }
                {
                    index.value < items.length - 1
                    && <Button label='' className={classname([styles.indicator, indicatorRightClassName, styles.nxt])} onClick={handleNext} />
                }
            </>
        );
    };

    React.useEffect(() => {
        handleAutoPlay();
        return clearTimeoutHandler;
    }, []);

    React.useEffect(() => {
        indexRef.current = index;
    }, [index]);

    const totalSlideItemsLength = loop ? items.length + 2 : items.length;

    return (
        <div className={classname([styles.container, className, enableShadow && styles.hasShadow])}>
            {generateIndicatorButtons()}
            <div className={styles.wrapper}>
                <div className={classname([styles.mainContent, index.animation && styles.animation])} style={{
                    width: `${totalSlideItemsLength * 100}%`,
                    marginLeft: `${index.value * -100}%`
                }}>
                    {
                        loop
                        && <div style={{
                            width: `${100 / totalSlideItemsLength}%`
                        }}>{items[items.length - 1]}</div>
                    }
                    {
                        items.map(item =>
                            <div key={item.key} style={{
                                width: `${100 / totalSlideItemsLength}%`
                            }}>{item}</div>
                        )
                    }
                    {
                        loop
                        && <div style={{
                            width: `${100 / totalSlideItemsLength}%`
                        }}>{items[0]}</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Slide;