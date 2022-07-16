import React from 'react';
import { disableScroll, enableScroll } from '../../../helpers/dom.helpers';
import UtilsService from '../../../services/utils.service';
import styles from './styles.module.scss';

const Loader = (): JSX.Element => {
    React.useEffect(() => {
        const popupId = `${+new Date()}`;
        disableScroll();
        UtilsService.instance.isShownPopupIds.push(popupId);

        return (): void => {
            UtilsService.instance.isShownPopupIds = UtilsService.instance.isShownPopupIds.filter(item => item !== popupId);
            if (!UtilsService.instance.isShownPopupIds.length) enableScroll();
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <div />
            </div>
        </div>
    );
};

export default Loader;