import React from 'react';

import styles from './FileLineShort.module.sass';
import File from '../../../../../generalComponents/Files';

const FileLineShort = ({file, setChosenFile, chosen}) => {

    return (<div
        className={`${styles.fileLineShortWrap} ${chosen ? styles.fileChosen : null}`}
        onClick={() => setChosenFile(file)}
    >
        <div className={styles.infoWrap}>
            <div className={styles.fileWrap}><File format={file.ext} color={file.color} /></div>
            <div className={styles.fileName}>{file.name}</div>
        </div>
        <div className={styles.menuWrap}><span className={styles.menu} /></div>
    </div>)
}

export default FileLineShort;