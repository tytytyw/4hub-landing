import React from 'react';

import styles from './ServePanel.module.sass';
import { ReactComponent as BarsIcon } from '../../../../assets/PrivateCabinet/bars.svg';
import { ReactComponent as LinesIcon } from '../../../../assets/PrivateCabinet/lines.svg';
import { ReactComponent as PreviewIcon } from '../../../../assets/PrivateCabinet/preview.svg';
import { ReactComponent as VerticalLinesIcon } from '../../../../assets/PrivateCabinet/vertical-lines.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/PrivateCabinet/menu.svg';
import { ReactComponent as SafeIcon } from '../../../../assets/PrivateCabinet/safe.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/PrivateCabinet/share.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/PrivateCabinet/delete.svg';

const ServePanel = ({blob, setBlob}) => {
    return (
        <div className={styles.servePanelWrap}>
            <div className={styles.groupStart}>
                <div className={styles.viewPanel}>
                    <div className={styles.iconView}><BarsIcon /></div>
                    <div className={styles.iconView}><LinesIcon /></div>
                    <div className={styles.iconView}><PreviewIcon /></div>
                    <div className={styles.iconView}><VerticalLinesIcon /></div>
                </div>
                <div className={styles.filterPanel}>
                    <div className={styles.iconView}><MenuIcon className={styles.iconSVG} /><div /></div>
                    <span className={styles.chooseButton}>Выбрать</span>
                </div>
            </div>
            <div className={styles.groupEnd}>
                <div className={styles.buttons}>
                    <div className={styles.createButton}><span>Создать</span><div /></div>
                    <label className={styles.downloadButton} onClick={() => setBlob({...blob, show: true})}>Загрузить</label>
                </div>
                <div className={styles.iconButtons}>
                    <div className={styles.iconView}><SafeIcon className={styles.iconSVG} /></div>
                    <div className={styles.iconView}><ShareIcon className={styles.iconSVG} /></div>
                    <div className={styles.iconView}><DeleteIcon className={styles.iconTrash} /></div>
                </div>
            </div>
        </div>
    )
}

export default ServePanel;
