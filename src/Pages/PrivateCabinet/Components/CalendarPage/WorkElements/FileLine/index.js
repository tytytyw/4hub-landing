import React from 'react'

import styles from './FileLine.module.sass'
import File from '../../../../../../generalComponents/Files'
import {ReactComponent as DownLoadIcon} from '../../../../../../assets/PrivateCabinet/download.svg'
import {ReactComponent as PrintIcon} from '../../../../../../assets/PrivateCabinet/print.svg'
import {ReactComponent as SettingsIcon} from '../../../../../../assets/PrivateCabinet/settings.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import classNames from 'classnames'
import {useSelector} from 'react-redux'

const FileLine = ({file, setChosenFile, chosenFile, setMouseParams, setAction, setFilePreview, filePreview}) => {

    const size = useSelector(state => state.PrivateCabinet.size)

    return (
        <div
            onClick={() => setChosenFile(file)}
            onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: chosenFile?.fid === file?.fid,
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

            </div>

            <div className={styles.optionsWrap}>

                <div className={styles.iconView}>
                    <DownLoadIcon/>
                </div>

                <div className={styles.iconView}>
                    <PrintIcon/>
                </div>

                <div className={classNames(styles.iconView, styles.iconSettings)}>
                    <SettingsIcon/>
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
                    <ShareIcon/>
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
        </div>
    )
}

export default FileLine