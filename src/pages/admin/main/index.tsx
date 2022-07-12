import React from 'react';
import Layout from '../../../modules/layout';
import { AdminHeaderMenuEnum } from '../../../resources/constants/enum';
import { adminHeaderMenu } from '../../../resources/constants/utils';
import AuthService from '../../../services/auth.service';
import AdminHeader from '../components/header';
import CategoriesManagement from '../modules/categories';
import Login from '../modules/login';
import styles from './styles.module.scss';

const AdminMainPage = (): JSX.Element => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const [menu, setMenu] = React.useState<IAdminHeaderMenuItem>(adminHeaderMenu[0]);

    const generateContent = (): JSX.Element | undefined => {
        if (menu.id === AdminHeaderMenuEnum.products) return (
            <Layout key={2} isAdminLayout className={styles.container}>
                <CategoriesManagement />
            </Layout>
        );
    };

    if (!AuthService.instance.isSignedInAsAdmin) return (
        <Layout key={1} isAdminLayout className={styles.container}>
            <Login onSuccess={(): void => {
                setToggle(!toggle);
            }} />
        </Layout>
    );

    return (
        <>
            <AdminHeader onMenuChange={(m): void => {
                setMenu(m);
            }} />
            {generateContent()}
        </>
    );
};

export default AdminMainPage;