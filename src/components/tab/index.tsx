import React from 'react';
import { classname } from '../../helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string,
    items: ITabItem[],
    onChange?: (tab: ITabItem) => void,
}

const Tab = ({ className, items, onChange }: IProps): JSX.Element => {
    const [selectedItem, setSelectedItem] = React.useState<ITabItem | undefined>(items.find(item => item.selected));
    const [activeItemHTMLElement, setActiveItemHTMLElement] = React.useState<HTMLButtonElement | undefined>();
    const containerRef = React.useRef<HTMLDivElement>(null);

    const updateActiveItemHTMLElement = (): void => {
        if (containerRef.current) {
            const els = containerRef.current.getElementsByTagName('button');
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                if (Number(el.getAttribute('data-active')) === 1) {
                    setActiveItemHTMLElement(el);
                }
            }
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            updateActiveItemHTMLElement();
        }, 200);
    }, []);

    React.useEffect(() => {
        setSelectedItem(items.find(item => item.selected));
        setTimeout(() => {
            updateActiveItemHTMLElement();
        }, 200);
    }, [items]);

    return (
        <div className={classname([styles.container, className])} ref={containerRef}>
            {
                items.map(item =>
                    <button key={item.value} data-active={selectedItem?.value === item.value ? 1 : 0} className={classname([(selectedItem?.value === item.value) && styles.active])} onClick={(e): void => {
                        setSelectedItem(item);
                        setActiveItemHTMLElement(e.target as HTMLButtonElement);
                        if(onChange && selectedItem?.value !== item.value) onChange(item);
                    }}>
                        {item.label}
                    </button>
                )
            }

            {
                activeItemHTMLElement
                &&
                <span className={styles.indicator} style={{
                    width: `${activeItemHTMLElement.clientWidth}px`,
                    left: `${activeItemHTMLElement.offsetLeft}px`
                }} />
            }
        </div>
    );
};

export default Tab;