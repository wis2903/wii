import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../button';
import Input from '../input';
import Textbox from '../textbox';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}

const Contact = ({ className }: IProps): JSX.Element => {
    return (
        <div className={classname([className, styles.container])}>
            <h3 className={styles.label}>Liên hệ với chúng tôi</h3>
            <div className={styles.form}>
                <Input className={styles.input} label='Địa chỉ email của bạn' />
                <Textbox className={styles.input} label='Nội dung liên hệ' />
                <Button primary label='Gửi thông tin liên hệ' />
            </div>
        </div>
    );
};

export default Contact;