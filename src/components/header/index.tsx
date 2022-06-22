import React from 'react';
import Cart from '../cart';
import Logo from '../logo';
import Search from '../search';
import Tab from '../tab';
import Wrapper from '../wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';

const Header = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <img className={styles.image2} src={SakuraImage} alt="sakura"/>
            
            <Wrapper className={styles.wrapper}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <Tab
                        className={styles.tab}
                        items={[
                            {
                                label: 'Trang chủ',
                                value: 1,
                                selected: true,
                            },
                            {
                                label: 'Kiểm tra đơn hàng',
                                value: 2,
                            },
                        ]}
                    />
                    <Search className={styles.search} label="Tìm sản phẩm ..."/>
                    <Cart />
                </div>
            </Wrapper>
        </div>
    );
};

export default Header;