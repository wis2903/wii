import React from 'react';
import Tooltip from '../../../components/tooltip';
import { classname } from '../../../helpers/utils.helper';
import NotificationService from '../../../services/notification.service';
import Notifications from '../../notifications';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const NotificationButton = ({ className }: IProps): JSX.Element => {
    const [isShowNotification, setIsShowNotification] = React.useState<boolean>(false);
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
    const timeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const handleOnShowNotification = (): void => {
        if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        setIsShowNotification(true);

        timeoutHandler.current = setTimeout(() => {
            setIsShowNotification(false);
        }, 2000);
    };

    React.useEffect(() => {
        NotificationService.instance.addShowNotificationListeners(handleOnShowNotification);

        return (): void => {
            NotificationService.instance.removeShowNotificationListeners(handleOnShowNotification);
            if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        };
    }, []);

    return (
        <>
            <div className={classname([styles.container, className])}>
                <Tooltip text='Đơn hàng đã xử lý' dir='bottom'>
                    <button onClick={(): void => {
                        setIsExpanded(true);
                    }}>
                        <span className={styles.icon}>
                            <span className='fa fa-truck' />
                        </span>
                    </button>
                </Tooltip>

                {
                    isShowNotification
                    &&
                    <span className={styles.notification}>Đơn hàng đã được xử lý</span>
                }
            </div>

            {
                isExpanded
                &&
                <>
                    <div className={styles.overlay} onClick={(): void => {
                        setIsExpanded(false);
                    }} />
                    <Notifications />
                </>
            }
        </>
    );
};

export default NotificationButton;