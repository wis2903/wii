import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    label: string,
    primary?: boolean,
    icon?: IComponentIconInfo,
}

const Button = ({ className, primary, label, icon, ...rest }: IProps): JSX.Element => {
    const [isClicked, setIsClicked] = React.useState<boolean>(false);
    const [isBlocking, setIsBlocking] = React.useState<boolean>(false);
    const clickDebounceTimeout = React.useRef<ReturnType<typeof setTimeout>>();
    const clickAnimationTimeout = React.useRef<ReturnType<typeof setTimeout>>();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (isClicked || isBlocking) {
            e.preventDefault();
            return;
        }
        if (rest.onClick) rest.onClick(e);
        setIsBlocking(true);
        setIsClicked(true);
        clickAnimationTimeout.current = setTimeout(() => {
            setIsClicked(false);
        }, 200);
        clickDebounceTimeout.current = setTimeout(() => {
            setIsBlocking(false);
        }, 500);
    };

    React.useEffect(() => {
        return (): void => {
            if (clickDebounceTimeout.current) clearTimeout(clickDebounceTimeout.current);
            if (clickAnimationTimeout.current) clearTimeout(clickAnimationTimeout.current);
        };
    }, []);

    return (
        <button {...rest} className={classname([styles.container, primary && styles.primary, className, isClicked && styles.active])} onClick={handleOnClick}>
            {
                icon?.type === 'image'
                &&
                <img src={icon.value} alt="icon" />
            }

            {
                icon?.type === 'fa'
                &&
                <span className={classname([styles.icon, icon.value])} />
            }

            {label}

            {rest.children}
        </button>
    );
};

export default Button;