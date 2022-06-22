import React from 'react';
import { isDescendant } from '../../helpers/dom.helpers';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    label: string,
    className?: string,
    options: ISelectOption[],
}

const Select = ({ className, label, options }: IProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = React.useState<ISelectOption | undefined>(options.find(item => item.selected));
    const [isShowDropdown, setIsShowDropdown] = React.useState<boolean>(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleShowDropdown = (): void => {
        setIsShowDropdown(true);
        window.addEventListener('click', handleOnWindowClick);
    };

    const handleHideDropdown = (): void => {
        setIsShowDropdown(false);
        window.removeEventListener('click', handleOnWindowClick);
    };

    const handleOnWindowClick = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;

        if (
            triggerRef.current
            && dropdownRef.current
            && !isDescendant(triggerRef.current, target)
            && !isDescendant(dropdownRef.current, target)
        ) {
            handleHideDropdown();
        }
    };

    const handleToggleDropdown = (): void => {
        if (isShowDropdown) handleHideDropdown();
        else handleShowDropdown();
    };

    return (
        <div className={classname([styles.container, className, isShowDropdown && styles.open])}>
            <button className={styles.trigger} onClick={handleToggleDropdown} ref={triggerRef}>
                <span className={styles.label}>{label}</span>
                <span>{selectedOption?.label || 'Select an option'}</span>
            </button>

            {
                isShowDropdown
                &&
                <div className={styles.dropdown} ref={dropdownRef}>
                    {
                        options.map(item =>
                            <button key={item.value} className={classname([item.value === selectedOption?.value && styles.active])} onClick={(): void => {
                                setSelectedOption(item);
                                handleHideDropdown();
                            }}>
                                {item.label}
                            </button>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default Select;