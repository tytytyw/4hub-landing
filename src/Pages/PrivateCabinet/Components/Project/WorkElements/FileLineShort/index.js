import React from 'react'

import styles from './FileLineShort.module.sass'
import classNames from 'classnames'

const FileLineShort = ({file, setChosenFile, chosen, setMouseParams, setFilePreview, filePreview, size}) => {

    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.fileChosen]: !!chosen,
                [styles?.[`wrapper_${size}`]]: size !== 'medium'
            })}
            onClick={() => setChosenFile(file)}
            onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
        >
            <div className={styles.infoWrap}>
                <div className={styles.fileWrap}>
                    <img src="./assets/PrivateCabinet/avatars/Bitmap.png" alt=""/>
                </div>
                <div className={styles.fileName}>
                    <p>{file.name}</p>
                    <div className={styles.fileInfo}><span>JPEG</span>&nbsp;-&nbsp;<span>10 MB</span></div>
                </div>
            </div>

            <div className={styles.rightWrap}>
                <div className={styles.fileDate}>
                    <p>19.08.2019</p>
                </div>
                <div
                    className={styles.menuWrap}
                    onClick={e => {
                        setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
                    }}
                >
                    <span className={styles.menu}/>
                </div>
            </div>
        </div>)
}

export default FileLineShort;