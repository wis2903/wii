import React from 'react';
import { animateScroll } from '../../helpers/dom.helpers';
import Blank from '../blank';
import Button from '../button';
import styles from './styles.module.scss';

const BackToTop = (): JSX.Element => {
    const [isShown, setIsShown] = React.useState<boolean>(false);

    const handleScrollToTop = (): void => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });
    };

    const handleOnWindowScroll = (): void => {
        if (window.scrollY > 100) setIsShown(true);
        else setIsShown(false);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleOnWindowScroll);

        return (): void => {
            window.removeEventListener('scroll', handleOnWindowScroll);
        };
    }, []);

    return (
        isShown ? <Button primary label='' className={styles.container} onClick={handleScrollToTop} /> : <Blank />
    );
};

export default BackToTop;