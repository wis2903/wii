import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const NormalProductPlaceholder = ({ className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.placeholder, className])}>
            <div className={styles.thumbnail} />
            <div className={styles.info}>
                <div className={styles.name} />
                <div className={styles.rating} />
                <div className={styles.price} />
            </div>
        </div>
    );
};

export default NormalProductPlaceholder;