import React from 'react';
import { classname } from '../../helpers/utils.helper';
import EventService from '../../services/event.service';
import Button from '../basic/button';
import PopupWrapper from '../popup/popup-wrapper';
import styles from './styles.module.scss';

interface IProps {
    message: string,
    isAlert?: boolean,
    onClose?: VoidFunction,
}

const Confirmation = ({ onClose, message, isAlert }: IProps): JSX.Element => {
    const handleClose = (): void => {
        if (onClose) onClose();
        EventService.instance.onAnswerTheConfirmation.trigger(false);
    };

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            onClose={handleClose}
            title={{
                text: 'Thông báo',
                icon: {
                    type: 'fa',
                    value: 'fa fa-comment-dots',
                }
            }}
        >
            <div className={styles.message}>{message}</div>
            <div className={styles.action}>
                <Button
                    label={isAlert ? 'Đóng' : 'Hủy'}
                    onClick={handleClose} className={classname([isAlert && styles.fullWidth])}
                    primary={isAlert}
                />
                {
                    !isAlert
                    &&
                    <Button primary label='Đồng ý' onClick={(): void => {
                        EventService.instance.onAnswerTheConfirmation.trigger(true);
                        if (onClose) onClose();
                    }} />
                }
            </div>
        </PopupWrapper>
    );
};

export default Confirmation;