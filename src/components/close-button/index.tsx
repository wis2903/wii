import React from 'react';
import Button from '../button';
import styles from './styles.module.scss';

interface IProps {
    onClick?: VoidFunction,
}

const CloseButton = ({ onClick }: IProps): JSX.Element => {
    return (
        <Button label='' className={styles.container} onClick={onClick}>
            <span />
            <span />
        </Button>
    );
};

export default CloseButton;