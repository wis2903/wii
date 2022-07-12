import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/basic/button';
import Input from '../../../../components/basic/input';
import PopupWrapper from '../../../../components/popup/popup-wrapper';
import AuthService from '../../../../services/auth.service';
import UtilsService from '../../../../services/utils.service';
import styles from './styles.module.scss';

interface IProps {
    onSuccess?: VoidFunction,
}

interface IInputState {
    value: string,
    error?: string,
}

const Login = ({ onSuccess }: IProps): JSX.Element => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    // const [isRememberAccount, setIsRememberAccount] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<IInputState>({ value: '' });
    const [password, setPassword] = React.useState<IInputState>({ value: '' });

    const validate = (): boolean => {
        let flag = true;
        if (!username.value) {
            setUsername(current => ({
                ...current,
                error: 'Vui lòng nhập tên tài khoản',
            }));
            flag = false;
        }
        if (!password.value) {
            setPassword(current => ({
                ...current,
                error: 'Vui lòng nhập mật khẩu',
            }));
            flag = false;
        }
        return flag;
    };

    const handleLogin = async (): Promise<void> => {
        if (isProcessing || !validate()) return;
        setIsProcessing(true);
        const success = await AuthService.instance.requestSignInAsAdmin(username.value, password.value);
        if (!success) {
            UtilsService.instance.alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu.');
            setIsProcessing(false);
        } else{
            if (onSuccess) onSuccess();
        } 
    };

    return (
        <PopupWrapper
            className={styles.container}
            bodyClassName={styles.body}
            onClose={(): void => {
                navigate('/');
            }}
        >
            <div className={styles.mainContent}>
                <h3>Đăng nhập làm quản trị viên</h3>
                <Input
                    className={styles.input}
                    required
                    label='Tên đăng nhập'
                    error={username.error}
                    onValueChange={(value): void => {
                        setUsername({ value });
                    }}
                    onEnter={handleLogin}
                />
                <Input
                    className={styles.input}
                    required
                    label='Mật khẩu'
                    type='password'
                    error={password.error}
                    onValueChange={(value): void => {
                        setPassword({ value });
                    }}
                    onEnter={handleLogin}
                />
                {/* <Checkbox
                    className={styles.checkbox}
                    label='Ghi nhớ tài khoản'
                    onChecked={(): void => {
                        setIsRememberAccount(true);
                    }}
                    onUnchecked={(): void => {
                        setIsRememberAccount(false);
                    }}
                /> */}
                <Button
                    primary
                    label={isProcessing ? 'Đang tải...' : 'Đăng nhập'}
                    onClick={handleLogin}
                />
            </div>
        </PopupWrapper>
    );
};

export default Login;