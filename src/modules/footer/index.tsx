import React from 'react';
import Button from '../../components/basic/button';
import Contact from '../../components/contact';
import Wrapper from '../../components/basic/wrapper';
import styles from './styles.module.scss';
import SakuraImage from '../../resources/images/sakura.png';
import Logo from '../../components/logo';
import CategoryService from '../../services/category.service';
import EventService from '../../services/event.service';
import { useNavigate } from 'react-router-dom';
import { animateScroll } from '../../helpers/dom.helpers';

interface IProps {
    reference?: React.LegacyRef<HTMLDivElement>,
}

const Footer = ({ reference }: IProps): JSX.Element => {
    const [categories, setCategories] = React.useState<ICategory[]>([]);
    const navigate = useNavigate();

    const handleShowCartPopup = (): void => {
        EventService.instance.onRequestShowShoppingCart.trigger();
    };

    const handleOnCategoriesLoaded = (): void => {
        setCategories(CategoryService.instance.categories);
    };

    const handleNavigateToAdmin = (): void => {
        navigate('/admin');
    };

    const handleNavigateToHomePage = (): void => {
        animateScroll({
            initialPosition: window.scrollY,
            targetPosition: 0,
            duration: 1000,
        });
        navigate('/');
    };

    React.useEffect(() => {
        EventService.instance.onCategoriesLoaded.addEventListener(handleOnCategoriesLoaded);

        return (): void => {
            EventService.instance.onCategoriesLoaded.removeEventListener(handleOnCategoriesLoaded);
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
                        <Button label='Trang chủ' onClick={handleNavigateToHomePage} />
                        <Button label='Giới thiệu' />
                        <Button label='Giỏ hàng' onClick={handleShowCartPopup} />
                        <Button label='Tra cứu đơn hàng' />
                        <Button label='Quản trị viên' onClick={handleNavigateToAdmin} />
                    </div>
                </div>

                <div className={styles.menu}>
                    <h3>Danh mục sản phẩm</h3>

                    <div className={styles.buttons}>
                        {categories.map(item =>
                            <Button key={item.id} label={item.name} onClick={(): void => {
                                navigate(`/?category-id=${item.id}`);
                            }} />
                        )}
                    </div>
                </div>
                <Contact className={styles.contact} />
            </Wrapper>
        </div>
    );
};

export default Footer;