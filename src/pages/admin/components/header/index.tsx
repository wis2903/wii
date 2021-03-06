import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/basic/button';
import Wrapper from '../../../../components/basic/wrapper';
import Logo from '../../../../components/logo';
import { classname, upperCaseFirstLetter } from '../../../../helpers/utils.helper';
import { adminHeaderMenu } from '../../../../resources/constants/utils';
import AuthService from '../../../../services/auth.service';
import styles from './styles.module.scss';

interface IProps {
    onMenuChange?: (menu: IAdminHeaderMenuItem) => void,
}

const AdminHeader = ({ onMenuChange }: IProps): JSX.Element => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = React.useState<IAdminHeaderMenuItem>(adminHeaderMenu[0]);

    const handleLogOut = async (): Promise<void> => {
        await AuthService.instance.requestSignOutAsAdmin();
        navigate('/');
    };

    const getMenuItems = (): IAdminHeaderMenuItem[] => {
        if (AuthService.instance.user?.role === 'admin') {
            return adminHeaderMenu;
        }
        return adminHeaderMenu.filter(item => !item.admin);
    };
    const menuItems = getMenuItems();

    return (
        <div className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <Logo />

                <div className={styles.right}>
                    {
                        menuItems.length > 1
                        &&
                        <div className={styles.menu}>
                            {
                                menuItems.map(item =>
                                    <Button
                                        key={item.id}
                                        label={item.label}
                                        className={classname([item.id === activeMenu.id && styles.active])}
                                        onClick={(): void => {
                                            setActiveMenu(item);
                                            if (item !== activeMenu && onMenuChange) onMenuChange(item);
                                        }}
                                    />
                                )
                            }
                        </div>
                    }
                    <div className={styles.userSettings}>
                        Ch??o, {upperCaseFirstLetter(AuthService.instance.user?.username || '')}!
                        <Button label='????ng xu???t' onClick={handleLogOut} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default AdminHeader;