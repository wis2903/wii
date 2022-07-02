import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    data: IPopupTitleComponentProps,
}

const PopupTitle = ({ className, data }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            {
                data.icon?.type === 'fa'
                &&
                <span className={classname([styles.icon, data.icon.value])} />
            }
            <h3>{data.text}</h3>
        </div>
    );
};

export default PopupTitle;