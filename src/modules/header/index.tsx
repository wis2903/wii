import React from 'react';
import CartButton from './cart-button';
import Logo from '../../components/logo';
import Search from '../../components/search';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';
import Cart from '../cart';

const Header = (): JSX.Element => {
    const [isShowCartPopup, setIsShowCartPopup] = React.useState<boolean>(false);

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
                        <CartButton className={styles.cart} onClick={(): void => {
                            setIsShowCartPopup(true);
                        }} />
                    </div>
                </Wrapper>
            </div>
            {
                isShowCartPopup
                &&
                <Cart onClose={(): void => {
                    setIsShowCartPopup(false);
                }} />
            }
        </>
    );
};

export default Header;