import React from 'react';
import Blank from '../../../components/basic/blank';
import Checkbox from '../../../components/basic/checkbox';
import Input from '../../../components/basic/input';
import Textbox from '../../../components/basic/textbox';
import { classname } from '../../../helpers/utils.helper';
import { emptyBuyerInfo } from '../../../resources/constants/utils';
import PaymentService from '../../../services/payment.service';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onChange?: (data: IBuyer) => void,
    onRememberBuyerInfoChange?: (isRemember: boolean) => void,
    error: IBuyerInfoValidationError,
}
interface ICachedBuyerInfoState {
    isLoading: boolean,
    data?: IBuyer,
}

const ShippingInfo = ({ className, onChange, onRememberBuyerInfoChange, error }: IProps): JSX.Element => {
    const formData = React.useRef<IBuyer>({ ...emptyBuyerInfo });
    const [isRememberBuyerInfo, setIsRememberBuyInfo] = React.useState<boolean>(false);
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
            if (res) {
                formData.current = res;
                setIsRememberBuyInfo(true);
            }
            setCachedBuyerInfo({ isLoading: false, data: res });
        });
    }, []);

    if (cachedBuyerInfo.isLoading) return <Blank />;
    return (
        <div className={classname([styles.container, className])}>
            <h3 className={styles.title}>Th??ng tin ng?????i nh???n h??ng</h3>

            <Input
                required
                className={styles.input}
                label='T??n ng?????i nh???n'
                error={error.name}
                onValueChange={handleOnNameChange}
                initValue={cachedBuyerInfo.data?.name}
            />
            <Input
                className={styles.input}
                label='Email ng?????i nh???n (kh??ng b???t bu???c)'
                error={error.email}
                onValueChange={handleOnEmailChange}
                initValue={cachedBuyerInfo.data?.email}
            />
            <Input
                required
                className={styles.input}
                label='S??? ??i???n tho???i ng?????i nh???n'
                error={error.phoneNumber}
                onValueChange={handleOnPhoneNumberChange}
                initValue={cachedBuyerInfo.data?.phoneNumber}
            />
            <Textbox
                required
                className={styles.input}
                label='?????a ch??? ng?????i nh???n'
                error={error.address}
                onValueChange={handleOnAddressChange}
                initValue={cachedBuyerInfo.data?.address}
            />
            <Checkbox
                label='Ghi nh??? cho l???n ?????t sau'
                checked={isRememberBuyerInfo}
                className={styles.checkbox}
                onChecked={(): void => {
                    if (onRememberBuyerInfoChange) onRememberBuyerInfoChange(true);
                }}
                onUnchecked={(): void => {
                    if (onRememberBuyerInfoChange) onRememberBuyerInfoChange(false);
                }}
            />
        </div>
    );
};

export default ShippingInfo;