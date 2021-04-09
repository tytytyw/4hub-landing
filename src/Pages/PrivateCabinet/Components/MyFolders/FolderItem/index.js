import React, {useState} from 'react';

import styles from './FolderItem.module.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg'
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg'
import { ReactComponent as AddIcon } from '../../../../../assets/PrivateCabinet/plus-3.svg'

const FolderItem = ({src, title, quantity, listCollapsed}) => {

    const [chosen, setChosen] = useState(false);

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.titleWrap}>
                <img
                    src={`./assets/PrivateCabinet/${src}`}
                    alt='icon'
                    className={styles.icon}
                />
                {!listCollapsed && <span className={styles.title}>{title} </span>}
                {!listCollapsed && <span> ({quantity})</span>}
            </div>
            <div className={styles.functionWrap}>
                <PlayIcon
                    className={`${styles.playButton} ${chosen ? styles.revert : undefined}`}
                    onClick={() => setChosen(!chosen)}
                />
                <div className={styles.menuWrap}><span className={styles.menu} /></div>
            </div>
        </div>
        <div className={`${styles.addFolderToFolder} ${chosen ? undefined : styles.hidden}`}>
            <div className={styles.addFolderName}>
                <FolderIcon style={{width: '17px'}} />
                {!listCollapsed && <span>Новая папка</span>}
            </div>
            <AddIcon className={styles.addFolderIcon} />
        </div>
        </>
    )
};

export default FolderItem;
