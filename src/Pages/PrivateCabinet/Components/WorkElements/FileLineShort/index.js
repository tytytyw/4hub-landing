import React from 'react';

import styles from './FileLineShort.module.sass';
import File from '../../../../../generalComponents/Files';

<<<<<<< HEAD
const FileLineShort = ({file, setChosenFile, chosen}) => {
=======
const FileLineShort = ({file, setChosenFile, chosen, setMouseParams}) => {
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

    return (<div
        className={`${styles.fileLineShortWrap} ${chosen ? styles.fileChosen : null}`}
        onClick={() => setChosenFile(file)}
    >
        <div className={styles.infoWrap}>
            <div className={styles.fileWrap}><File format={file.ext} color={file.color} /></div>
            <div className={styles.fileName}>{file.name}</div>
        </div>
<<<<<<< HEAD
        <div className={styles.menuWrap}><span className={styles.menu} /></div>
=======
        <div
            className={styles.menuWrap}
            onClick={e => {setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})}}
        ><span className={styles.menu} /></div>
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
    </div>)
}

export default FileLineShort;