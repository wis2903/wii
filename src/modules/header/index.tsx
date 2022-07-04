import React from 'react';
import CartButton from './cart-button';
import Logo from '../../components/logo';
import Search from '../../components/search';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
// import SakuraImage from '../../resources/images/sakura.png';
import NotificationButton from './notification-button';
import CartService from '../../services/cart.service';

const Header = (): JSX.Element => {

    return (
        <>
            <div className={styles.container}>
                {/* <div className={styles.decoration}>
                    <img className={styles.image2} src={SakuraImage} alt="sakura" />
                </div> */}

                <Wrapper className={styles.wrapper}>
                    <div className={styles.left}>
                        <Logo />
                    </div>
                    <div className={styles.right}>
                        <Search className={styles.search} label="Tìm kiếm sản phẩm ..." />
                        <NotificationButton />
                        <CartButton className={styles.cart} onClick={(): void => {
                            CartService.instance.requestShowPopup();
                        }} />
                    </div>
                </Wrapper>
            </div>
        </>
    );
};

export default Header;