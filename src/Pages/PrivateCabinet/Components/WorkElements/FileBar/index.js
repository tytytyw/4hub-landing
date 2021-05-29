import React, {useState} from 'react';

import styles from './FileBar.module.sass';
import File from '../../../../../generalComponents/Files';

const FileBar = ({file, isLoading, chosen, setChosenFile, setMouseParams, setFilePreview, filePreview, filePick, setFilePick}) => {

    const [picked, setPicked] = useState(false);
    const onPickFile = (e) => {
        e.stopPropagation();
        setPicked(!picked);
        setFilePick({...filePick, files: [...filePick.files, file.fid]})
    }

    return (
        <>
            <div
                className={`${styles.fileBar} ${chosen ? styles.fileBarChosen : null}`} onClick={() => !isLoading ?
                setChosenFile(file) : undefined}
                onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
            >
                <div
                    className={styles.menu}
                    onClick={e => {setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})}}
                ><span/></div>
                <div className={styles.symbols}>
                    <div>{file?.fig && !isLoading ? <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='fig' /> : null}</div>
                    <div>{file?.emo && !isLoading ? <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' /> : null}</div>
                </div>
                <div className={styles.file}>
                    <File color={file.color} format={file.ext} className={styles.mainFile}/>
                    {file?.is_pass && !isLoading ? <img className={styles.locked} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                </div>
                <div className={file.tag ? styles.ftag : styles.fEmtyTag}>{file.tag ? `#${file.tag}` : null}</div>
                <div className={styles.fname}>{file.name}</div>
                <div className={styles.fileInfo}>
                    <div>{file.size_now}</div>
                    <div>{file.mtime.split(' ')[0]}</div>
                </div>
                {filePick?.show ? <div
                    className={`${styles.filePickBox} ${picked ? styles.filePickBoxPicked : ''}`}
                    onClick={onPickFile}
                    onDoubleClick={e => e.stopPropagation()}
                /> : null}
            </div>
        </>
    )
}

export default FileBar;