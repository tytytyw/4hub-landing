import React from 'react';

import styles from './FolderItem.module.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg'

const FolderItem = ({src, title, quantity}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.titleWrap}>
                <img
                    src={`./assets/PrivateCabinet/${src}`}
                    alt='icon'
                    className={styles.icon}
                />
                <span className={styles.title}>{title} </span>
                <span> ({quantity})</span>
            </div>
            <div className={styles.functionWrap}>
                <PlayIcon className={styles.playButton} />
                <div className={styles.menuWrap}><span className={styles.menu} /></div>
            </div>
        </div>
    )
};

export default FolderItem;
