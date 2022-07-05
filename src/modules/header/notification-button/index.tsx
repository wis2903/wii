import React from 'react';
import Tooltip from '../../../components/tooltip';
import { classname } from '../../../helpers/utils.helper';
import EventService from '../../../services/event.service';
import Notifications from '../../notifications';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const NotificationButton = ({ className }: IProps): JSX.Element => {
    const [isShowNotification, setIsShowNotification] = React.useState<boolean>(false);
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
    const timeoutHandler = React.useRef<ReturnType<typeof setTimeout>>();

    const handleOnPaymentSuccess = (): void => {
        if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        setIsShowNotification(true);
        timeoutHandler.current = setTimeout(() => {
            setIsShowNotification(false);
        }, 3000);
    };

    React.useEffect(() => {
        EventService.instance.onPaymentSuccess.addEventListener(handleOnPaymentSuccess);

        return (): void => {
            EventService.instance.onPaymentSuccess.removeEventListener(handleOnPaymentSuccess);
            if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
        };
    }, []);

    return (
        <>
            <div className={classname([styles.container, className])}>
                <Tooltip text='Đơn hàng đã đặt' dir='bottom'>
                    <button onClick={(): void => {
                        setIsExpanded(true);
                    }}>
                        <span className={styles.icon}>
                            <span className='fa fa-money-check' />
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