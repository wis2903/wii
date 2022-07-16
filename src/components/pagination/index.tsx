import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Blank from '../basic/blank';
import styles from './styles.module.scss';

interface IProps {
    total: number,
    numberItemPerPage: number,
    onChange?: (page: number) => void,
    reset?: (func: VoidFunction) => void,
}
interface IItemState {
    value: number,
    active?: boolean,
}

const Pagination = ({ total, numberItemPerPage, onChange, reset }: IProps): JSX.Element => {
    const pages = Math.ceil(total / numberItemPerPage);
    const [items, setItems] = React.useState<IItemState[]>(
        Array.from({ length: pages }).map((item, i) => ({
            value: i,
            active: i === 0,
        }))
    );

    React.useEffect(() => {
        if (reset) reset((): void => {
            setItems(current => current.map(item => item.value === 0 ? { value: item.value, active: true } : { value: item.value }));
            if (onChange) onChange(0);
        });
    }, []);

    React.useEffect(() => {
        setItems(
            Array.from({ length: pages }).map((item, i) => ({
                value: i,
                active: i === 0,
            }))
        );
    }, [total, numberItemPerPage]);

    if(items.length <= 1) return <Blank />;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {
                    items.map(item =>
                        <button
                            key={item.value}
                            className={classname([item.active && styles.active])}
                            onClick={(): void => {
                                setItems(current => current.map(p => p.value === item.value ? { value: p.value, active: true } : { value: p.value }));
                                if (onChange) onChange(item.value);
                            }}
                        >
                            {item.value + 1}
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Pagination;