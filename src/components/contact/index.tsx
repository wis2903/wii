import React from 'react';
import { classname } from '../../helpers/utils.helper';
import { emailRegex } from '../../resources/constants/regex';
import FeedbackService from '../../services/feedback.service';
import UtilsService from '../../services/utils.service';
import Button from '../basic/button';
import Input from '../basic/input';
import Textbox from '../basic/textbox';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
}
interface IInputState {
    value: string,
    error?: string,
}

const Contact = ({ className }: IProps): JSX.Element => {
    const [email, setEmail] = React.useState<IInputState>({ value: '' });
    const [content, setContent] = React.useState<IInputState>({ value: '' });
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const clearEmailFunction = React.useRef<VoidFunction>();
    const clearContentFunction = React.useRef<VoidFunction>();

    const clear = (): void => {
        setEmail({ value: '' });
        setContent({ value: '' });
        if (clearEmailFunction.current) clearEmailFunction.current();
        if (clearContentFunction.current) clearContentFunction.current();
    };

    const validate = (): boolean => {
        let flag = true;
        if (!email.value) {
            setEmail(current => ({
                ...current,
                error: 'Vui lòng nhập email',
            }));
            flag = false;
        } else if (!emailRegex.test(email.value)) {
            setEmail(current => ({
                ...current,
                error: 'Định dạng email không đúng',
            }));
            flag = false;
        }

        if (!content.value) {
            setContent(current => ({
                ...current,
                error: 'Vui lòng nhập nội dung ý kiến',
            }));
            flag = false;
        }

        return flag;
    };

    const handleSendFeedback = async (): Promise<void> => {
        if (isProcessing || !validate()) return;
        setIsProcessing(true);
        await FeedbackService.instance.send(email.value, content.value);
        setIsProcessing(false);
        clear();
        UtilsService.instance.alert('Cảm ơn bạn đã đóng góp ý kiến. Chúng tôi sẽ ghi nhận ý đóng góp của bạn để hoàn thiện hệ thống.');
    };

    return (
        <div className={classname([className, styles.container])}>
            <h3 className={styles.label}>Liên hệ với chúng tôi</h3>

            <div className={styles.item}>
                Email: <span>sonicacustomer@email.com</span>
            </div>

            <div className={styles.item}>
                Hotline: <span>0973.987.047</span>
            </div>

            <div className={styles.form}>
                <h3 className={styles.label}>Gửi ý kiến của bạn</h3>
                <Input
                    required
                    className={styles.input}
                    label='Địa chỉ email của bạn'
                    error={email.error}
                    onValueChange={(value): void => {
                        setEmail({ value });
                    }}
                    clear={(func): void => {
                        clearEmailFunction.current = func;
                    }}
                />
                <Textbox
                    required
                    className={styles.input}
                    label='Nội dung liên hệ'
                    error={content.error}
                    onValueChange={(value): void => {
                        setContent({ value });
                    }}
                    clear={(func): void => {
                        clearContentFunction.current = func;
                    }}
                />
                <Button
                    primary
                    label={isProcessing ? 'Đang xử lý...' : 'Gửi ý kiến'}
                    onClick={handleSendFeedback}
                />
            </div>
        </div>
    );
};

export default Contact;