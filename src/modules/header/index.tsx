import React from 'react';
import CartButton from './cart-button';
import Logo from '../../components/logo';
import Search from './search';
import Wrapper from '../../components/basic/wrapper';
import styles from './styles.module.scss';
import NotificationButton from './notification-button';
import SakuraImage from '../../resources/images/sakura.png';

const Header = (): JSX.Element => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.decoration}>
                    <img className={styles.image2} src={SakuraImage} alt="sakura" />
                </div>

                <Wrapper className={styles.wrapper}>
                    <div className={styles.left}>
                        <Logo />
                    </div>
                    <div className={styles.right}>
                        <Search className={styles.search} label="Tìm kiếm sản phẩm ..." />
                        <NotificationButton />
                        <CartButton className={styles.cart} />
                    </div>
                </Wrapper>
            </div>
        </>
    );
};

export default Header;