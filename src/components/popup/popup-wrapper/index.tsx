import React from 'react';
import { disableScroll, enableScroll } from '../../../helpers/dom.helpers';
import { classname } from '../../../helpers/utils.helper';
import PopupBody from '../popup-body';
import PopupTitle from '../popup-title';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    bodyClassName?: string,
    onClose?: () => void,
    children: React.ReactNode,
    title?: IPopupTitleComponentProps,
}

const PopupWrapper = ({ className, bodyClassName, children, onClose, title }: IProps): JSX.Element => {
    React.useEffect(() => {
        disableScroll();

        return (): void => {
            enableScroll();
        };
    }, []);

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.overlay} onClick={onClose} />
            <PopupBody className={bodyClassName} onClose={onClose}>
                {
                    title
                    &&
                    <PopupTitle data={title} />
                }
                <div className={styles.mainContent}>
                    {children}
                </div>
            </PopupBody>
        </div>
    );
};

export default PopupWrapper;