import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
    className?: string,
}

const Logo = ({ className }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Button className={classname([styles.container, className])} label="" onClick={(): void => {
            navigate('/');
        }}>
        </Button>
    );
};

export default Logo;