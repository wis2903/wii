import React from 'react';
import { classname } from '../../../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLElement> {
    className?: string,
    title: string,
    extra?: React.ReactNode,
}

const Panel = ({ className, title, children, extra, ...rest }: IProps): JSX.Element => {
    return (
        <div {...rest} className={classname([styles.container, className])}>
            <div className={styles.header}>
                {title}
                {
                    !!extra
                    &&
                    <div className={styles.extra}>{extra}</div>
                }
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
};

export default Panel;