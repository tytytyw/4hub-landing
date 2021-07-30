import React from 'react'

import styles from './FileLine.module.sass'
import File from '../../../../../generalComponents/Files'
import {ReactComponent as DownLoadIcon} from '../../../../../assets/PrivateCabinet/download.svg'
import {ReactComponent as PrintIcon} from '../../../../../assets/PrivateCabinet/print.svg'
import {ReactComponent as SettingsIcon} from '../../../../../assets/PrivateCabinet/settings.svg'
import {ReactComponent as DeleteIcon} from '../../../../../assets/PrivateCabinet/delete.svg'
import {ReactComponent as ShareIcon} from '../../../../../assets/PrivateCabinet/share.svg'
import classNames from 'classnames'
import {useSelector} from 'react-redux'

const FileLine = ({
          file, setChosenFile, chosen, setMouseParams, setAction, setFilePreview, filePreview, filePick,
          setFilePick, shareLink, callbackArrMain
}) => {
    const size = useSelector(state => state.PrivateCabinet.size)
    const downloadFile = () => {
        setTimeout(() => {
            callbackArrMain.forEach(item => {if(item.type === 'download') item.callback()})
        }, 0)
    }

    const printFile = () => {
        setTimeout(() => {
            callbackArrMain.forEach(item => {if(item.type === 'print') item.callback(file)})
        }, 0)
    }

    const onPropertiesFile = () => {
        setTimeout(() => {
            callbackArrMain.forEach((item, index) => {if(item.type === 'customize') item.callback(callbackArrMain, index)})
        }, 0)
    }

    const onShareFile = () => {
        setTimeout(() => {
            callbackArrMain.forEach(item => {if(item.type === 'share') setAction(item)})
        }, 0)
    }

    const onPickFile = () => {
        if(filePick.show) {
            const isPicked = filePick.files.filter(el => el === file.fid);
            isPicked.length > 0 ? setFilePick({...filePick, files: filePick.files.filter(el => el !== file.fid)}) : setFilePick({...filePick, files: [...filePick.files, file.fid]});
        }
        setChosenFile(file)
    }

    return (
        <div
            onClick={onPickFile}
            onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: chosen,
                [styles?.[`wrapper_${size}`]]: size !== 'medium'
            })}
        >
            <div className={styles.fileAbout}>

                <div className={styles.file}>
                    <File format={file.ext} color={file.color}/>
                </div>

                <div className={styles.infoWrap}>

                    <div className={styles.fileName}>
                        {file.name && file.name.slice(0, file.name.lastIndexOf('.'))}
                    </div>

                    <div className={styles.fileInfo}>
                        <span className={styles.fileDate}>
                            {file.mtime.split(' ')[0]}
                        </span>
                        <span className={styles.fileSize}>
                            {file.size_now}
                        </span>
                        {size !== 'small' &&
                        <div className={styles.symbols}>
                            {file.is_pass === 1 &&
                            <img
                                className={styles.locked}
                                src={`./assets/PrivateCabinet/locked.svg`}
                                alt='lock'
                            />}
                            {file.fig &&
                            <img
                                className={styles.sign}
                                src={`./assets/PrivateCabinet/signs/${file.fig}.svg`}
                                alt='sign'
                            />}
                            {file.emo &&
                            <img
                                className={styles.smile}
                                src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`}
                                alt='emoji'
                            />}
                        </div>}
                    </div>

                </div>

                {size === 'small' &&
                <div className={styles.symbols}>
                    {file.is_pass === 1 &&
                    <img
                        className={styles.locked}
                        src={`./assets/PrivateCabinet/locked.svg`}
                        alt='lock'
                    />}
                    {file.fig &&
                    <img
                        className={styles.sign}
                        src={`./assets/PrivateCabinet/signs/${file.fig}.svg`}
                        alt='sign'
                    />}
                    {file.emo &&
                    <img
                        className={styles.smile}
                        src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`}
                        alt='emoji'
                    />}
                </div>}

                {shareLink && <div className={styles.linkWrap}>
                    <a className={styles.link} href={`https://fs2.mh.net.ua`}>https://fs2.mh.net.ua</a>
                </div>}

            </div>

            <div className={styles.optionsWrap}>

                <div className={styles.iconView}>
                    <DownLoadIcon
                        onClick={downloadFile}
                    />
                </div>

                <div className={styles.iconView}>
                    <PrintIcon 
                        onClick={printFile}
                    />
                </div>

                <div className={classNames(styles.iconView, styles.iconSettings)}>
                    <SettingsIcon
                        onClick={onPropertiesFile}
                    />
                </div>

                <div
                    className={classNames(styles.iconView, styles.iconTrash)}
                    onClick={() => setAction({
                        type: 'delete',
                        name: 'Удаление файла',
                        text: `Вы действительно хотите удалить файл ${file?.name}?`
                    })}
                >
                    <DeleteIcon/>
                </div>

                <div className={classNames(styles.iconView, styles.iconShare)}>
                    <ShareIcon
                        onClick={onShareFile}
                    />
                </div>

                <div
                    className={styles.menuWrap}
                    onClick={e => {
                        setMouseParams({x: e.clientX, y: e.clientY, width: 260, height: 30})
                    }}
                >
                    <span className={styles.menu}/>
                </div>
            </div>
        </div>
    )
}

export default FileLine