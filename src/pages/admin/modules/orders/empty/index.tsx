import React from 'react';
import styles from './styles.module.scss';

interface IProps {
    message: string,
}

const Empty = ({message}: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            {message}
        </div>
    );
};

export default Empty;