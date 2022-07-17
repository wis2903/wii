import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../basic/button';
import styles from './styles.module.scss';
import Icon from '../../resources/images/puzzle.png';

interface IProps {
    className?: string,
}

const Logo = ({ className }: IProps): JSX.Element => {
    return (
        <Button className={classname([styles.container, className])} label="" onClick={(): void => {
            window.location.href = '/';
        }}>
            <img src={Icon} alt='icon' />
            Sonica
            <span>Market</span>
        </Button>
    );
};

export default Logo;