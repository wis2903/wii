import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../basic/button';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Icon from '../../resources/images/puzzle.png';

interface IProps {
    className?: string,
}

const Logo = ({ className }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Button className={classname([styles.container, className])} label="" onClick={(): void => {
            navigate('/');
        }}>
            <img src={Icon} alt='icon' />
            Sonica
        </Button>
    );
};

export default Logo;