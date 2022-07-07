import React from 'react';
import styles from './styles.module.scss';

interface IProps {
    text: string,
}

const PageTitle = ({ text }: IProps): JSX.Element => {
    return (
        <h3 className={styles.container}>
            {text}
        </h3>
    );
};

export default PageTitle;