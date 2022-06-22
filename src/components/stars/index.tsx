import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    rate: number,
}
interface IStar {
    index: number,
    checked?: boolean,
}

const Stars = ({ rate }: IProps): JSX.Element => {
    const numberOfCheckedStars = rate > 1 ? 5 : Math.max(Math.round(rate * 5), 1);

    const [items] = React.useState<IStar[]>(Array.from({ length: 5 }).map((item, i) => ({
        index: i,
        checked: i < numberOfCheckedStars,
    })));

    return (
        <div className={styles.container}>
            {
                items.map(item =>
                    <span className={classname(['fa fa-star', item.checked && styles.checked])} key={item.index} />
                )
            }
        </div>
    );
};

export default Stars;