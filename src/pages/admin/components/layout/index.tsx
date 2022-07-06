import React from 'react';
import { animateScroll } from '../../../../helpers/dom.helpers';
import { classname } from '../../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}

const AdminLayout = ({ className }: IProps): JSX.Element => {
    React.useEffect(() => {
        animateScroll({
            initialPosition: window.scrollY,
            targetPosition: 0,
            duration: 1000,
        });
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            ...
        </div>
    );
};

export default AdminLayout;