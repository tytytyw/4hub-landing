import React from 'react';

import styles from './FileBar.module.sass';
import File from '../../../../../generalComponents/Files';

const FileBar = ({file}) => {
    return (
        <div className={styles.fileBar}>
            <div className={styles.menu}><span/></div>
            <div className={styles.symbols}>
                <div><img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='fig' /></div>
                <div><img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' /></div>
            </div>
            <div className={styles.file}>
                <File color={file.color} format={file.ext} className={styles.mainFile}/>
                <img className={styles.locked} src='./assets/PrivateCabinet/locked.svg' alt='lock' />
            </div>
            <div className={styles.fname}>{file.name}</div>
            <div className={styles.fileInfo}>
                <div>{file.size_now}</div>
                <div>{file.ctime.split(' ')[0]}</div>
            </div>
        </div>
    )
}

export default FileBar;