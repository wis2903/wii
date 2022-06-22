import React from 'react';
import styles from './styles.module.scss';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}

const Layout = ({ children, className, ...rest }: IProps): JSX.Element => {
    React.useEffect(() => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });
    }, []);

    return (
        <div className={classname([className, styles.container])} {...rest}>
            {children}
        </div>
    );
};

export default Layout;