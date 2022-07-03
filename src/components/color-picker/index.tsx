import React from 'react';
import { classname } from '../../helpers/utils.helper';
import Button from '../basic/button';
import Tooltip from '../tooltip';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    colors: IColor[],
}

const ColorPicker = ({ colors, className }: IProps): JSX.Element => {
    const [activeColor, setActiveColor] = React.useState<IColor>(colors[0]);

    return (
        <div className={classname([styles.container, className])}>
            {
                colors.map(item =>
                    <Tooltip
                        className={classname([styles.item, item.value === activeColor.value && styles.active])}
                        key={item.value}
                        text={item.label}
                        dir='center'
                    >
                        <Button onClick={(): void => {
                            setActiveColor(item);
                        }}>
                            <span style={{ backgroundColor: item.value }} />
                        </Button>
                    </Tooltip>
                )
            }
        </div>
    );
};

export default ColorPicker;