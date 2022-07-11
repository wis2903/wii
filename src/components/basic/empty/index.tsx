import React from 'react';
import styles from './styles.module.scss';
import EmptyBoxIcon from '../../../resources/images/empty-box.png';
import { classname } from '../../../helpers/utils.helper';
import Button from '../button';
import { useNavigate } from 'react-router-dom';

interface IProps {
    className?: string,
    message?: string,
}

const Empty = ({ className, message }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.mainContent}>
                <img src={EmptyBoxIcon} alt='empty-box' />
                <span className={styles.message}>{message || 'Không tìm thấy kết quả'}</span>
                <Button label='Xem tất cả sản phẩm' onClick={(): void => {
                    navigate('/');
                }} />
            </div>
        </div>
    );
};

export default Empty;