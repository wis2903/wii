import React from 'react';
import Tooltip from '../../../../components/basic/tooltip';
import Stars from '../../../../components/stars';
import { formatNumber } from '../../../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    data: IProduct,
}

const ProductItem = ({ data }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h3 className={styles.name}>{data.codeFromCompany} - {data.name}</h3>
                <p className={styles.description}>{data.description}</p>
                <Stars rate={data.rating} />
                <div className={styles.price}>
                    <span>Giá gốc: <span>{formatNumber(data.priceFromCompany)} VND</span></span>
                    <span>Giá bán: <span>{formatNumber(data.price)} VND</span></span>
                </div>
            </div>
            <div className={styles.action}>
                <Tooltip text='Xem thử'>
                    <button className={styles.viewButton}>
                        <span className='fa fa-eye' />
                    </button>
                </Tooltip>
                <Tooltip text='Xóa'>
                    <button className={styles.removeButton} />
                </Tooltip>
            </div>
        </div>
    );
};

export default ProductItem;