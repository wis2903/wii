import React from 'react';
import { disableScroll, enableScroll } from '../../../helpers/dom.helpers';
import { classname } from '../../../helpers/utils.helper';
import PopupBody from '../popup-body';
import PopupTitle from '../popup-title';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    bodyClassName?: string,
    onClose?: VoidFunction,
    children: React.ReactNode,
    title?: IPopupTitleComponentProps,
    footer?: React.ReactNode,
}

const PopupWrapper = ({ className, bodyClassName, children, onClose, title, footer }: IProps): JSX.Element => {
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
                <div className={classname(['popup-body-main-content', styles.mainContent, !!title && styles.hasTitle, !!footer && styles.hasFooter])}>
                    {children}
                </div>

                {
                    !!footer
                    &&
                    <div className={styles.footer}>
                        {footer}
                    </div>
                }
            </PopupBody>
        </div>
    );
};

export default PopupWrapper;