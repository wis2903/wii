import React from 'react';
import { Link } from 'react-router-dom';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IBreadcrumbItem {
    label: string,
    url: string,
}

interface IProps {
    className?: string,
    items: IBreadcrumbItem[],
}

const Breadcrumb = ({ className, items }: IProps): JSX.Element => {
    return (
        <div className={classname([className, styles.container])}>
            {
                items.map((item, i) =>
                    i === items.length - 1
                        ? <span key={item.label}>{item.label}</span>
                        : <Link key={item.label} to={item.url}>{item.label}</Link>
                )
            }
        </div>
    );
};

export default Breadcrumb;