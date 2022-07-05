import React from 'react';
import Blank from '../../../components/basic/blank';
import Input from '../../../components/basic/input';
import Textbox from '../../../components/basic/textbox';
import { classname } from '../../../helpers/utils.helper';
import { emptyBuyerInfo } from '../../../resources/constants/utils';
import PaymentService from '../../../services/payment.service';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onChange?: (data: IBuyer) => void,
    error: IBuyerInfoValidationError,
}
interface ICachedBuyerInfoState {
    isLoading: boolean,
    data?: IBuyer,
}

const ShippingInfo = ({ className, onChange, error }: IProps): JSX.Element => {
    const formData = React.useRef<IBuyer>({ ...emptyBuyerInfo });
    const [cachedBuyerInfo, setCachedBuyerInfo] = React.useState<ICachedBuyerInfoState>({ isLoading: true });

    const handleOnNameChange = (value: string): void => {
        formData.current.name = value;
        if (onChange) onChange(formData.current);
    };

    const handleOnPhoneNumberChange = (value: string): void => {
        formData.current.phoneNumber = value;
        if (onChange) onChange(formData.current);
    };

    const handleOnEmailChange = (value: string): void => {
        formData.current.email = value;
        if (onChange) onChange(formData.current);
    };

    const handleOnAddressChange = (value: string): void => {
        formData.current.address = value;
        if (onChange) onChange(formData.current);
    };

    React.useEffect(() => {
        PaymentService.instance.getCachedBuyerInfo().then(res => {
            if (res) formData.current = res;
            setCachedBuyerInfo({ isLoading: false, data: res });
        });
    }, []);

    if (cachedBuyerInfo.isLoading) return <Blank />;
    return (
        <div className={classname([styles.container, className])}>
            <h3 className={styles.title}>Thông tin người nhận hàng</h3>

            <Input
                required
                className={styles.input}
                label='Tên người nhận'
                error={error.name}
                onValueChange={handleOnNameChange}
                initValue={cachedBuyerInfo.data?.name}
            />
            <Input
                required
                className={styles.input}
                label='Số điện thoại người nhận'
                error={error.phoneNumber}
                onValueChange={handleOnPhoneNumberChange}
                initValue={cachedBuyerInfo.data?.phoneNumber}
            />
            <Input
                required
                className={styles.input}
                label='Email người nhận'
                error={error.email}
                onValueChange={handleOnEmailChange}
                initValue={cachedBuyerInfo.data?.email}
            />
            <Textbox
                required
                className={styles.input}
                label='Địa chỉ người nhận'
                error={error.address}
                onValueChange={handleOnAddressChange}
                initValue={cachedBuyerInfo.data?.address}
            />
        </div>
    );
};

export default ShippingInfo;