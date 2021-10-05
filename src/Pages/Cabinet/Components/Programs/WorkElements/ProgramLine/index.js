import React from 'react'

import styles from './ProgramLine.module.sass'
import {ReactComponent as SettingsIcon} from '../../../../../../assets/PrivateCabinet/settings.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import classNames from 'classnames'
import {useSelector} from 'react-redux'

const ProgramLine = ({
          program, chosenProgram, setChosenProgram, setMouseParams, setAction, shareLink
}) => {

    const size = useSelector(state => state.Cabinet.size)

    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: chosenProgram?.id === program?.id,
                [styles?.[`wrapper_${size}`]]: size !== 'medium'
            })}
            onClick={() => setChosenProgram(program)}
        >
            <div className={styles.fileAbout}>

                <div className={styles.file}>
                    <img
                        className={styles.contentImg}
                        src={program.icon}
                        alt={program.name}
                    />
                    {/*<File format={program?.ext} color={program?.is_write === '0' ? '#C1C1C1' : program?.color} />*/}
                </div>

                <div className={styles.infoWrap}>

                    <div className={styles.fileName}>
                        {program?.name}
                    </div>

                    <div className={styles.fileInfo}>
                        <span className={styles.fileDate}>
                            {program?.ctime?.split(' ')[0]}
                        </span>
                        <span className={styles.fileSize}>
                            {program?.size_now}
                        </span>
                        {size !== 'small' &&
                        <div className={styles.symbols}>
                            {program?.is_pass === 1 &&
                            <img
                                className={styles.locked}
                                src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
                                alt='lock'
                            />}
                            {program?.fig &&
                            <img
                                className={styles.sign}
                                src={`${imageSrc}assets/PrivateCabinet/signs/${program?.fig}.svg`}
                                alt='sign'
                            />}
                            {program?.emo &&
                            <img
                                className={styles.smile}
                                src={`${imageSrc}assets/PrivateCabinet/smiles/${program?.emo}.svg`}
                                alt='emoji'
                            />}
                        </div>}
                    </div>

                </div>

                {size === 'small' &&
                <div className={styles.symbols}>
                    {program?.is_pass === 1 &&
                    <img
                        className={styles.locked}
                        src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
                        alt='lock'
                    />}
                    {program?.fig &&
                    <img
                        className={styles.sign}
                        src={`${imageSrc}assets/PrivateCabinet/signs/${program?.fig}.svg`}
                        alt='sign'
                    />}
                    {program?.emo &&
                    <img
                        className={styles.smile}
                        src={`${imageSrc}assets/PrivateCabinet/smiles/${program?.emo}.svg`}
                        alt='emoji'
                    />}
                </div>}

                {shareLink && <div className={styles.linkWrap}>
                    <a className={styles.link} href={`https://fs2.mh.net.ua`}>https://fs2.mh.net.ua</a>
                </div>}

            </div>

            <div className={styles.optionsWrap}>

                <div className={classNames({[styles.iconView]: true, [styles.iconSettings]: true, [styles.disable]: program?.is_write === '0'})}>
                    <SettingsIcon
                        onClick={null}
                    />
                </div>

                <div
                    className={classNames(styles.iconView, styles.iconTrash)}
                    onClick={() => setAction({
                        type: 'delete',
                        name: 'Удаление файла',
                        text: `Вы действительно хотите удалить файл ${program?.name}?`
                    })}
                >
                    <DeleteIcon/>
                </div>

                <div className={classNames(styles.iconView, styles.iconShare)}>
                    <ShareIcon
                        onClick={() => {}}
                    />
                </div>

                <div
                    className={styles.menuWrap}
                    onClick={e => {
                        setMouseParams({x: e.clientX, y: e.clientY, width: 260, height: 25})
                    }}
                >
                    <span className={styles.menu}/>
                </div>
            </div>
        </div>
    )
}

export default ProgramLine