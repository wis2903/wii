import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClick?: VoidFunction,
}

const CloseButton = ({ className, onClick }: IProps): JSX.Element => {
    return (
        <Button label='' className={classname([styles.container, className])} onClick={onClick}>
            <span />
            <span />
        </Button>
    );
};

export default CloseButton;