import React from 'react';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import Tooltip from '../tooltip';
import styles from './styles.module.scss';

interface INavigatorItem {
    label: string,
    reference?: React.LegacyRef<HTMLDivElement>,
}

interface IProps {
    className?: string,
    items: INavigatorItem[],
}

const Navigator = ({ className, items }: IProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const handleOnWindowScroll = (): void => {
        for (let i = 0; i < items.length; i++) {
            const el = Object(items[i].reference).current as HTMLElement;
            if (el && el.offsetTop >= window.scrollY) {
                setActiveIndex(i);
                break;
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleOnWindowScroll);

        return (): void => {
            window.removeEventListener('scroll', handleOnWindowScroll);
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            {
                items.map((item, i) =>
                    <Button label='' key={item.label} className={classname([i === activeIndex && styles.active])} onClick={(): void => {
                        if (item.reference) {
                            const el = Object(items[i].reference).current as HTMLElement;
                            if (el) {
                                animateScroll({
                                    targetPosition: el.offsetTop - 100,
                                    initialPosition: window.scrollY,
                                    duration: 1000,
                                });
                            }
                        }
                    }}>
                        <Tooltip text={item.label} className={styles.item} dir='right' />
                    </Button>
                )
            }
        </div>
    );
};

export default Navigator;