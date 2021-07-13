import React from 'react';

import styles from './FileLineShort.module.sass';
import File from '../../../../../generalComponents/Files';

const FileLineShort = ({file, setChosenFile, chosen, setMouseParams, setFilePreview, filePreview, filePick, setFilePick}) => {

    const onPickFile = () => {
        if(filePick.show) {
            const isPicked = filePick.files.filter(el => el === file.fid);
            isPicked.length > 0 ? setFilePick({...filePick, files: filePick.files.filter(el => el !== file.fid)}) : setFilePick({...filePick, files: [...filePick.files, file.fid]});
        }
        setChosenFile(file);
    }

    return (<div
        className={`${styles.fileLineShortWrap} ${chosen ? styles.fileChosen : null}`}
        onClick={onPickFile}
        onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
    >
        <div className={styles.infoWrap}>
            <div className={styles.fileWrap}><File format={file.ext} color={file.color} /></div>
            <div className={styles.fileName}>{file.name}</div>
        </div>
        <div
            className={styles.menuWrap}
            onClick={e => {setMouseParams({x: e.clientX, y: e.clientY, width: 260, height: 30})}}
        ><span className={styles.menu} /></div>
    </div>)
}

export default FileLineShort;