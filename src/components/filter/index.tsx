import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Checkbox from '../basic/checkbox';
import CloseButton from '../basic/close-button';
import Select from '../basic/select';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    onClose?: VoidFunction,
}

const Filter = ({ className, onClose }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className])}>
            <div className={styles.mainContent}>
                {/* <div className={styles.multiCheck}>
                    <h3 className={styles.label}>Màu sắc</h3>
                    <div className={styles.checkboxs}>
                        <Checkbox label='Trắng' />
                        <Checkbox label='Đen' />
                        <Checkbox label='Đỏ' />
                        <Checkbox label='Vàng' />
                        <Checkbox label='Cam' />
                        <Checkbox label='Xanh' />
                        <Checkbox label='Nâu' />
                    </div>
                </div> */}

                <Select className={styles.select} label='Giá' options={[
                    {
                        label: 'Tất cả',
                        value: -1,
                        selected: true,
                    },
                    {
                        label: '100K - 300K',
                        value: 2,
                    },
                    {
                        label: '300K - 500K',
                        value: 3,
                    },
                    {
                        label: 'trên 500K',
                        value: 4,
                    },
                ]} />

                <Select className={styles.select} label='Xuất xứ' options={[
                    {
                        label: 'Tất cả',
                        value: -1,
                        selected: true,
                    },
                    {
                        label: 'Trung Quốc',
                        value: 2,
                    },
                    {
                        label: 'Nhật Bản',
                        value: 3,
                    },
                    {
                        label: 'Mỹ',
                        value: 4,
                    },
                    {
                        label: 'Châu Âu',
                        value: 5,
                    },
                ]} />
            </div>
            <div>
                <CloseButton onClick={onClose} />
            </div>
        </div>
    );
};

export default Filter;