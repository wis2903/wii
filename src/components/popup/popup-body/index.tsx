import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import CloseButton from '../../close-button';
import styles from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement>{
    className?: string,
    onClose?: () => void,
}

const PopupBody = ({className, children, onClose}: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            <CloseButton className={styles.closeButton} onClick={onClose} />
            {children}
        </div>
    );
};

export default PopupBody;