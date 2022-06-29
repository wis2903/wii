import React from 'react';
import BestSellerList from '../best-seller-list';
import Slide from '../../components/slide';
import styles from './styles.module.scss';

interface IProps {
    title: string,
    reference?: React.LegacyRef<HTMLDivElement>,
}

const MostPopular = ({ title, reference }: IProps): JSX.Element => {
    return (
        <div className={styles.container} ref={reference}>
            <h3 className={styles.label}>{title}</h3>
            <Slide
                className={styles.slide}
                items={[
                    <BestSellerList
                        key={1}
                        className={styles.list}
                        products={Array.from({ length: 4 }).map((item, i) => ({
                            id: String(i),
                            name: 'Túi Handbag cầm tay đơn giản',
                            price: 199000
                        }))}
                    />,
                    <BestSellerList
                        key={2}
                        className={styles.list}
                        products={Array.from({ length: 4 }).map((item, i) => ({
                            id: String(i),
                            name: 'Túi Handbag cầm tay đơn giản',
                            price: 199000
                        }))}
                    />,
                    <BestSellerList
                        key={3}
                        className={styles.list}
                        products={Array.from({ length: 2 }).map((item, i) => ({
                            id: String(i),
                            name: 'Túi Handbag cầm tay đơn giản',
                            price: 199000
                        }))}
                    />
                ]} />
        </div>
    );
};

export default MostPopular;