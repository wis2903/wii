import React from 'react';
import Button from '../../../../components/basic/button';
import Wrapper from '../../../../components/basic/wrapper';
import Logo from '../../../../components/logo';
import { classname } from '../../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IMenuItem {
    label: string,
    id: string
}

const menu: IMenuItem[] = [
    {
        label: 'Quản lý sản phẩm',
        id: 'categories',
    },
    {
        label: 'Đơn hàng',
        id: 'orders',
    },
    {
        label: 'Thống kê',
        id: 'statistic',
    },
];

const AdminHeader = (): JSX.Element => {
    const [activeMenu] = React.useState<IMenuItem>(menu[0]);

    return (
        <div className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <Logo />

                <div className={styles.right}>
                    <div className={styles.menu}>
                        {
                            menu.map(item =>
                                <Button
                                    key={item.id}
                                    label={item.label}
                                    className={classname([item.id === activeMenu.id && styles.active])}
                                />
                            )
                        }
                    </div>
                    <div className={styles.userSettings}>
                        Chào, Whiskey!
                        <Button label='Đăng xuất' />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default AdminHeader;