import React from 'react';
import { classname, formatNumber } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    value: number,
}

const Price = ({ className, value }: IProps): JSX.Element => {
    return (
        <div className={classname([className, styles.container])}>
            {formatNumber(value)} đ
        </div>
    );
};

export default Price;