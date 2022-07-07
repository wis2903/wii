import React from 'react';
import Layout from '../../../modules/layout';
import AdminHeader from '../components/header';
import CategoriesManagement from '../modules/categories';
import styles from './styles.module.scss';

const AdminMainPage = (): JSX.Element => {
    return (
        <Layout isAdminLayout className={styles.container}>
            <AdminHeader />
            <CategoriesManagement />
        </Layout>
    );
};

export default AdminMainPage;