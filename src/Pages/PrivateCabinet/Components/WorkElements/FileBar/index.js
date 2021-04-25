import React from 'react';

import styles from './FileBar.module.sass';
import File from '../../../../../generalComponents/Files';

const FileBar = ({file, isLoading, progress, chosen, setChosenFile}) => {
    return (
        <div className={`${styles.fileBar} ${chosen ? styles.fileBarChosen : null}`} onClick={() => setChosenFile(file)}>
            <div className={styles.menu}><span/></div>
            <div className={styles.symbols}>
                <div>{file?.fig && !isLoading ? <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='fig' /> : null}</div>
                <div>{file?.emo && !isLoading ? <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' /> : null}</div>
            </div>
            <div className={styles.file}>
                <File color={file.color} format={file.ext} className={styles.mainFile}/>
                {file?.is_pass && !isLoading ? <img className={styles.locked} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
            </div>
            {!isLoading ? <div className={file.tag ? styles.ftag : styles.fEmtyTag}>{file.tag ? `#${file.tag}` : null}</div> : null}
            {!isLoading ? <div className={styles.fname}>{file.name}</div> : null}
            {!isLoading ? <div className={styles.fileInfo}>
                <div>{file.size_now}</div>
                <div>{file.ctime.split(' ')[0]}</div>
            </div> : null}
            {isLoading ? <div className={styles.loadingWrap}>
                <div className={styles.numberPercentage}>{progress.toFixed()} %</div>
                <div className={styles.statusBar}><div style={{width: `${progress}%`}} className={styles.innerStatusBar} /></div>
            </div> : null}
        </div>
    )
}

export default FileBar;