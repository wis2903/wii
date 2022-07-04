import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

type ITooltipDir = 'left' | 'right' | 'top' | 'bottom' | 'center';
interface IProps extends React.HTMLAttributes<HTMLElement> {
    className?: string,
    dir?: ITooltipDir,
    text: string,
    theme?: 'light' | 'dark',
}

const Tooltip = ({ className, children, text, dir, theme }: IProps): JSX.Element => {
    return (
        <div className={classname([styles.container, className, dir && styles[dir], theme && styles[theme]])}>
            <span className={styles.tooltip}>{text}</span>
            {children}
        </div>
    );
};

export default Tooltip;