import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const Logo = ({ className }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
        </div>
    );
};

export default Logo;