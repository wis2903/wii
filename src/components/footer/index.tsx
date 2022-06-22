import React from 'react';
import Button from '../button';
import Contact from '../contact';
import Wrapper from '../wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';
import Logo from '../logo';

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
                        <Button label='Kiểm tra đơn hàng' />
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
                        <Button label='Đồng hồ' />
                    </div>
                </div>
                <Contact className={styles.contact} />
            </Wrapper>
        </div>
    );
};

export default Footer;