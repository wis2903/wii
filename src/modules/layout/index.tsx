import React from 'react';
import styles from './styles.module.scss';
import { animateScroll } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import Payment from '../payment';
import PaymentService from '../../services/payment.service';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
}

const Layout = ({ children, className, ...rest }: IProps): JSX.Element => {
    const [isShowPaymentPopup, setIsShowPaymentPopup] = React.useState<boolean>(false);

    const handleOnRequestShowPaymentPopup = (): void => {
        setIsShowPaymentPopup(true);
    };

    React.useEffect(() => {
        animateScroll({
            targetPosition: 0,
            initialPosition: window.scrollY,
            duration: 1000,
        });

        PaymentService.instance.addRequestShowPopupListener(handleOnRequestShowPaymentPopup);

        return (): void => {
            PaymentService.instance.removeRequestShowPopupListener(handleOnRequestShowPaymentPopup);
        };
    }, []);

    return (
        <>
            <div className={classname([className, styles.container, 'layout'])} {...rest}>
                {children}
            </div>
            {
                isShowPaymentPopup
                &&
                <Payment onClose={(): void => {
                    setIsShowPaymentPopup(false);
                }} />
            }
        </>
    );
};

export default Layout;