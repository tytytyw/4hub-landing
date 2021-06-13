import React from 'react';

import styles from './ServePanel.module.sass';
import { ReactComponent as BarsIcon } from '../../../../assets/PrivateCabinet/bars.svg';
import { ReactComponent as LinesIcon } from '../../../../assets/PrivateCabinet/lines.svg';
import { ReactComponent as PreviewIcon } from '../../../../assets/PrivateCabinet/preview.svg';
import { ReactComponent as VerticalLinesIcon } from '../../../../assets/PrivateCabinet/vertical-lines.svg';
import { ReactComponent as SwitchSize } from '../../../../assets/PrivateCabinet/switch_size.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/PrivateCabinet/menu.svg';
import { ReactComponent as SafeIcon } from '../../../../assets/PrivateCabinet/safe.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/PrivateCabinet/share.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/PrivateCabinet/delete.svg';
import classNames from "classnames";


const ServePanel = ({blob, setBlob, listSize, setListSize, view, setView, chosenFile, setAction, fileSelect}) => {

    const changeSize = () => {
        switch (listSize) {
            case 'md':
                return 'lg'
            case 'lg':
                return 'sm'
            default:
                return 'md'
        }
    }

    return (
        <div className={styles.servePanelWrap}>
            <div className={styles.groupStart}>
                <div className={styles.viewPanel}>
                    <div className={`${view === 'bars' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('bars')}><BarsIcon /></div>
                    <div className={`${view === 'lines' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('lines')}><LinesIcon /></div>
                    <div className={`${view === 'preview' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('preview')}><PreviewIcon /></div>
                    <div className={`${view === 'workLinesPreview' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('workLinesPreview')}><VerticalLinesIcon /></div>
                </div>
                <div className={styles.filterPanel}>
                    <div
                        onClick={() => setListSize(changeSize())}
                        className={styles.iconView}
                    >
                        <SwitchSize className={styles.iconSVG} />
                    </div>
                    <div className={classNames(styles.iconView, styles.iconViewArrow)}>
                        <MenuIcon className={styles.iconSVG} />
                        <div />
                    </div>
                    <span className={styles.chooseButton}>Выбрать</span>
                </div>
            </div>
            <div className={styles.groupEnd}>
                <div className={styles.buttons}>
                    <div className={styles.createButton}><span>Создать</span><div /></div>
                    <label className={styles.downloadButton} onClick={() => fileSelect()}>Загрузить</label> {/*setBlob({...blob, show: true})*/}
                </div>
                <div className={styles.iconButtons}>
                    <div className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}><SafeIcon className={styles.iconSafe} /></div>
                    <div className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}><ShareIcon className={styles.iconShare} /></div>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {
                            if(chosenFile) setAction({type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`});
                        }}
                    ><DeleteIcon className={styles.iconTrash} /></div>
                </div>
            </div>
        </div>
    )
}

export default ServePanel;
