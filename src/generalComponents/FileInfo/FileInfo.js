import React from 'react'
import styles from './FileInfo.module.sass'
import classNames from "classnames";
import File from "../Files";
import {imageSrc} from "../globalVariables";

function FileInfo({file = {}}) {
    return(
        <>
            {file === {} ? null : <div className={styles.wrap}>
            <div className={styles.innerFileWrap}>
                <File color={file?.id_color} format={file?.ext ?? 'FILE'} />
                {file?.is_pass ? <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt='lock' /> : null}
            </div>
            <div className={styles.descriptionWrap}>
                <div className={styles.fileName}>{file?.name}</div>
                <div className={styles.innerFileInfo}>
                    <div className={styles.fileSize}>{file?.size_now}</div>
                    <div className={styles.descriptionGroup}>
                        <div
                            className={classNames({
                                [styles.tagBlock]: true,
                                [styles.ftag]: !!file?.tag,
                            })}
                        >
                            {file?.tag && `#${file?.tag}`}
                        </div>
                        {file.fig && (
                            <img
                                src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`}
                                alt="sign"
                            />
                        )}
                        {file.emo && (
                            <img
                                src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`}
                                alt="emoji"
                            />
                        )}
                    </div>
                </div>
            </div>
                {file?.ext === 'FILES' ? <div className={styles.severalChosen}>Выбранно {file?.count} файлов/папок</div> : null}
        </div>}
    </>
    )
}

export default FileInfo