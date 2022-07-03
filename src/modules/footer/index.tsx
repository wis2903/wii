import React from 'react';
import Button from '../../components/basic/button';
import Contact from '../../components/contact';
import Wrapper from '../../components/wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';
import Logo from '../../components/logo';
import CartService from '../../services/cart.service';
import CategoryService from '../../services/category.service';

interface IProps {
    reference?: React.LegacyRef<HTMLDivElement>,
}

const Footer = ({ reference }: IProps): JSX.Element => {
    const [categories, setCategories] = React.useState<ICategory[]>([]);

    const handleShowCartPopup = (): void => {
        CartService.instance.requestShowPopup();
    };

    const handleOnCategoriesLoaded = (): void => {
        setCategories(CategoryService.instance.categories);
    };

    React.useEffect(() => {
        CategoryService.instance.addLoadedCategoriesListener(handleOnCategoriesLoaded);

        return (): void => {
            CategoryService.instance.removeLoadedCategoriesListener(handleOnCategoriesLoaded);
        };
    }, []);

    return (
        <div className={styles.container} ref={reference}>
            <img src={SakuraImage} alt="sakura" />
            <img className={styles.image1} src={SakuraImage} alt="sakura" />
            <Wrapper className={styles.wrapper}>
                <div className={styles.com}>
                    <Logo className={styles.logo} />
                    <div className={styles.buttons}>
                        <Button label='Giới thiệu về chúng tôi' />
                        <Button label='Giỏ hàng của bạn' onClick={handleShowCartPopup} />
                        <Button label='Tra cứu đơn hàng' />
                        <Button label='Dành cho quản trị viên' />
                    </div>
                </div>

                <div className={styles.menu}>
                    <h3>Danh mục sản phẩm</h3>

                    <div className={styles.buttons}>
                        {categories.map(item =>
                            <Button key={item.id} label={item.name} />
                        )}
                    </div>
                </div>
                <Contact className={styles.contact} />
            </Wrapper>
        </div>
    );
};

export default Footer;