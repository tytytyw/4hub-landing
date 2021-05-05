import React, {useState} from 'react';

import styles from './FileBar.module.sass';
import File from '../../../../../generalComponents/Files';
import ContextMenu from '../../../../../generalComponents/ContextMenu';
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem';
import {contextMenuFile} from '../../../../../generalComponents/collections';

const FileBar = ({file, isLoading, progress, chosen, setChosenFile}) => {

    const [mouseParams, setMouseParams] = useState(null);
    const renderMenuItems = (target) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    return (
        <>
        <div className={`${styles.fileBar} ${chosen ? styles.fileBarChosen : null}`} onClick={() => setChosenFile(file)}>
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
            {!isLoading ? <div className={file.tag ? styles.ftag : styles.fEmtyTag}>{file.tag ? `#${file.tag}` : null}</div> : null}
            {!isLoading ? <div className={styles.fname}>{file.name}</div> : null}
            {!isLoading ? <div className={styles.fileInfo}>
                <div>{file.size_now}</div>
                <div>{file.mtime.split(' ')[0]}</div>
            </div> : null}
            {isLoading ? <div className={styles.loadingWrap}>
                <div className={styles.numberPercentage}>{progress.toFixed()} %</div>
                <div className={styles.statusBar}><div style={{width: `${progress}%`}} className={styles.innerStatusBar} /></div>
            </div> : null}
        </div>
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main)}</div>
                <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional)}</div>
            </ContextMenu> : null}
        </>
    )
}

export default FileBar;