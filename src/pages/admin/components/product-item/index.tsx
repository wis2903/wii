import React from 'react';
import RemoveButton from '../../../../components/basic/remove-button';
import Tooltip from '../../../../components/basic/tooltip';
import Stars from '../../../../components/stars';
import { formatNumber } from '../../../../helpers/utils.helper';
import EventService from '../../../../services/event.service';
import ProductService from '../../../../services/product.service';
import UtilsService from '../../../../services/utils.service';
import styles from './styles.module.scss';

interface IProps {
    data: IProduct,
    onDelete?: VoidFunction,
    onUpdate?: VoidFunction,
}

const ProductItem = ({ data, onDelete, onUpdate }: IProps): JSX.Element => {
    const handleDeleteProduct = async (): Promise<void> => {
        const confirmed = await UtilsService.instance.confirm('Vui lòng xác nhận tác vụ: Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (confirmed) {
            await ProductService.instance.delete(String(data.id));
            if (onDelete) onDelete();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h3 className={styles.name}><span>Mã sản phẩm: {data.timestamp}</span>{data.name}</h3>
                <div className={styles.ratingWrapper}>
                    <Stars rate={data.rating} />
                    <span className={styles.buyers}>{data.buyersNumber} người mua</span>
                </div>
                <div className={styles.price}>
                    <span>Giá gốc: <span>{formatNumber(data.priceFromCompany)} VND</span></span>
                    <span>Giá bán: <span>{formatNumber(data.price)} VND</span></span>
                </div>
            </div>
            <div className={styles.action}>
                <Tooltip text='Xem thử'>
                    <button className={styles.viewButton} onClick={(): void => {
                        EventService.instance.onRequestShowProductDetails.trigger(data);
                    }}>
                        <span className='fa fa-eye' />
                    </button>
                </Tooltip>
                <Tooltip text='Sửa'>
                    <button className={styles.viewButton} onClick={onUpdate}>
                        <span className='fa fa-pen' />
                    </button>
                </Tooltip>
                <Tooltip text='Xóa'>
                    <RemoveButton className={styles.removeButton} onClick={handleDeleteProduct} />
                </Tooltip>
            </div>
        </div>
    );
};

export default ProductItem;