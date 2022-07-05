import React from 'react';
import styles from './styles.module.scss';

const TabPlaceholder = (): JSX.Element => {
    return (
        <div className={styles.placeholder}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

export default TabPlaceholder;