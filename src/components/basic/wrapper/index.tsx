import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLElement> {
    className?: string,
}


const Wrapper = ({ className, children }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            {children}
        </div>
    );
};

export default Wrapper;