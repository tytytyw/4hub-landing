import React, {useState, useEffect, useRef} from 'react';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../../generalComponents/collections'
import File from '../../../../../../generalComponents/Files';

import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/edit-fill.svg'
import {ReactComponent as DotsMenu} from '../../../../../../assets/PrivateCabinet/dots-menu.svg'
import {ReactComponent as InfoIcon} from '../../../../../../assets/PrivateCabinet/info.svg'
import InfoPopover from '../InfoPopover';
import classNames from 'classnames';
import Input from '../../../MyProfile/Input';
import MiniToolBar from "../MiniToolBar";

const WorkLinesPreview = ({file, children, hideFileList}) => {

    const [color, setColor] = useState(null);
    const [f, setF] = useState(file);
    useEffect(() => {
        setF(file);
        const newColor = colors.filter(c => c.color === file?.color)
        setColor(newColor[0]);
    }, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    const [infoPopover, setInfoPopover] = useState(false)
    const [toolBar, setToolBar] = useState(true)

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={f.preview} alt='filePrieview' className={hideFileList ? styles.big_pic : ''}/>
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}>
                    <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                </video>
            }
            case 'audio': {
                return <>
                    <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
                        <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                    </audio>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src='./assets/PrivateCabinet/play-black.svg' alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src='./assets/PrivateCabinet/pause.svg' alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            default: {
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

    return (
        <div className={styles.workLinesPreviewWrap}>

        {!hideFileList &&
        <div className={styles.fileListWrap}>
            {children}
        </div>}

        <div className={styles.previewFileWrap}>

            <div className={styles.previewHeader}>

                <h4 className={styles.previewTitle}>Дизайн мото сайта</h4>

                <div className={styles.actionBlock}>

                    <button className={styles.actionBtn}>
                        <EditIcon/>
                    </button>

                    <button className={classNames({
                        [styles.actionBtn]: true,
                    })}>
                        <DotsMenu/>
                    </button>

                    <button
                        onMouseEnter={() => setInfoPopover(true)}
                        onMouseLeave={() => setInfoPopover(false)}
                        className={classNames({
                            [styles.actionBtn]: true,
                            [styles.activeBtn]: infoPopover
                        })}
                    >
                        <InfoIcon/>
                    </button>

                </div>

            </div>

            <div className={styles.previewContent}>

                {infoPopover &&
                <InfoPopover
                    set={setInfoPopover}
                />}

                {toolBar &&
                <MiniToolBar
                    set={setToolBar}
                />}

                <div className={styles.previewImg}>
                    <img src='./assets/PrivateCabinet/Bitmap2.png' alt='Moto Site'/>
                </div>

                <div className={styles.commentBlock}>

                    <div className={styles.addCommentBlock}>
                        <img src='./assets/PrivateCabinet/avatars/a2.svg' alt='Comment Avatar'/>
                        <Input
                            placeholder='Комментировать'
                            className={styles.commentInput}
                        />
                    </div>

                    <div className={styles.commentContent}>

                        <div className={styles.commentItem}>
                            <img
                                className={styles.commentAvatar}
                                src='./assets/PrivateCabinet/avatars/a3.svg'
                                alt='Comment Avatar'
                            />
                            <p className={styles.commentText}>
                                Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                время, программы электронной вёрстки типа
                            </p>
                        </div>

                        <div className={styles.commentItem}>
                            <img
                                className={styles.commentAvatar}
                                src='./assets/PrivateCabinet/avatars/a3.svg'
                                alt='Comment Avatar'
                            />
                            <p className={styles.commentText}>
                                Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                время, программы электронной вёрстки типа
                            </p>
                        </div>

                        <div className={styles.commentItem}>
                            <img
                                className={styles.commentAvatar}
                                src='./assets/PrivateCabinet/avatars/a3.svg'
                                alt='Comment Avatar'
                            />
                            <p className={styles.commentText}>
                                Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                время, программы электронной вёрстки типа
                            </p>
                        </div>

                        <div className={styles.commentItem}>
                            <img
                                className={styles.commentAvatar}
                                src='./assets/PrivateCabinet/avatars/a3.svg'
                                alt='Comment Avatar'
                            />
                            <p className={styles.commentText}>
                                Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                время, программы электронной вёрстки типа
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>)
}

export default WorkLinesPreview;