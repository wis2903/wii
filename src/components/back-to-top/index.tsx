import React from 'react';
import { animateScroll } from '../../helpers/dom.helpers';
import Button from '../button';
import styles from './styles.module.scss';

const BackToTop = (): JSX.Element => {
    const handleScrollToTop = (): void => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });
    };

    return (
        <Button primary label='' className={styles.container} onClick={handleScrollToTop}/>
    );
};

export default BackToTop;