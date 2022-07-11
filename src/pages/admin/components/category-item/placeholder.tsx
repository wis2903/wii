import React from 'react';
import styles from './styles.module.scss';

const CategoryPlaceholder = (): JSX.Element => {
    return (
        <div className={styles.placeholder}>
            <div className={styles.head}>
                <div className={styles.name} />
                <div className={styles.action}>
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.content} />
                <div className={styles.content} />
            </div>
        </div>
    );
};

export default CategoryPlaceholder;