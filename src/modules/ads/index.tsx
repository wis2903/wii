import React from 'react';
import Slide from '../../components/slide';
import styles from './styles.module.scss';

const Ads = (): JSX.Element => {
    return (
        <Slide
            autoPlay
            enableShadow
            indicatorLeftClassName={styles.slideIndicatorLeft}
            indicatorRightClassName={styles.slideIndicatorRight}
            items={[
                <div key={1} style={{ background: '#e5e5e5', height: '100%' }} />,
                <div key={2} style={{ background: '#d5d5d5', height: '100%' }} />,
            ]} />
    );
};

export default Ads;