import React from 'react';
import { classname } from '../../../helpers/utils.helper';
import UtilsService from '../../../services/utils.service';
import Button from '../button';
import Tooltip from '../tooltip';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClick?: VoidFunction,
    disabled?: boolean,
    disabledAlertMessage?: string,
}

const RemoveButton = ({ className, onClick, disabled, disabledAlertMessage }: IProps): JSX.Element => {
    const handleClick = (): void => {
        if(disabled){
            UtilsService.instance.alert(disabledAlertMessage || 'Không thể xóa giá trị thuộc tính duy nhất, yêu cầu phải có ít nhất 1 thuộc tính.');
        } else if(onClick){
            onClick();
        }
    };

    return (
        <Tooltip text='Xóa' className={classname([styles.container, className])}>
            <Button tabIndex={-1} className={classname([styles.removeButton, disabled && styles.disabled])} onClick={handleClick} />
        </Tooltip>
    );
};

export default RemoveButton;