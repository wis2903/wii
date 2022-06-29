import React from 'react';
import Cart from '../../components/cart';
import Logo from '../../components/logo';
import Search from '../../components/search';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';

const Header = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <img className={styles.image2} src={SakuraImage} alt="sakura" />

            <Wrapper className={styles.wrapper}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <Search className={styles.search} label="Tìm kiếm sản phẩm ..." />
                    <Cart className={styles.cart} />
                </div>
            </Wrapper>
        </div>
    );
};

export default Header;