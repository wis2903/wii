import React from 'react';
import Button from '../../components/button';
import Contact from '../../components/contact';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';
import Logo from '../../components/logo';

interface IProps {
    reference?: React.LegacyRef<HTMLDivElement>,
}

const Footer = ({ reference }: IProps): JSX.Element => {
    return (
        <div className={styles.container} ref={reference}>
            <img src={SakuraImage} alt="sakura" />
            <img className={styles.image1} src={SakuraImage} alt="sakura" />
            <Wrapper className={styles.wrapper}>
                <div className={styles.com}>
                    <Logo className={styles.logo} />
                    <div className={styles.buttons}>
                        <Button label='Trang chủ' />
                        <Button label='Giới thiệu' />
                        <Button label='Hỏi đáp' />
                        <Button label='Giỏ hàng' />
                    </div>

                    <div className={styles.links}>
                        <Button label='' />
                        <Button label='' />
                    </div>
                </div>

                <div className={styles.menu}>
                    <h3>Danh mục</h3>

                    <div className={styles.buttons}>
                        <Button label='Túi xách' />
                        <Button label='Giầy dép' />
                        <Button label='Mẹ và bé' />
                        <Button label='Đồng hồ' />
                    </div>
                </div>
                <Contact className={styles.contact} />
            </Wrapper>
        </div>
    );
};

export default Footer;