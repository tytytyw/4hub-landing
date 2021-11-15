import React, { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBarsPreview.module.sass';
import File from '../../../../../generalComponents/Files';
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {imageSrc, projectSrc} from '../../../../../generalComponents/globalVariables';
import {useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";
import {getMedia, renderHeight} from "../../../../../generalComponents/generalHelpers";
import {ReactComponent as FolderIcon} from "../../../../../assets/PrivateCabinet/folder-2.svg";
import {colors} from "../../../../../generalComponents/collections";
import classNames from "classnames";

const WorkBarsPreview = ({
    children, file, filePick, fileRef, grouped, chosenFile, load, options,
    gLoader, filesPage, chosenFolder, width = '100%'
}) => {
    const recentFiles = useSelector(state => state.Cabinet.recentFiles);
    const [f, setF] = useState(file);
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const previewRef = useRef(null);
    const innerFilesHeight = () => {
        switch(size) {
            case 'small': return '106px';
            case 'medium': return '149px';
            default: return '177px'
        }
    }

    useEffect(() => {
        setF(file);
        setPlay(false)
        if(file) {
            if(file?.mime_type && file.mime_type.includes('audio') && file.is_preview) {
                setLoading(true);
                getMedia(`${projectSrc}${file.preview}`, file.mime_type, setAudio, setLoading)
            }
            if(file?.mime_type && file.mime_type.includes('video') && file.is_preview) {
                setLoading(true);
                getMedia(`${projectSrc}${file.preview}`, file.mime_type, setVideo, setLoading)
            }
        }
    }, [file]); // eslint-disable-line react-hooks/exhaustive-deps


    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    const [containerRef] = useScrollElementOnScreen(options, load);

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                    return <img src={`${f.preview}?${new Date()}`} alt='filePrieview' />
            }
            case 'video': {
                return <video controls src={video ? video : ''} type={f.mime_type} onError={e => console.log(e)}>
                    <source src={video ? video : ''} type={f.mime_type}/>
                </video>
            }
            case 'audio': {
                return <>
                    <audio ref={audioRef} src={audio ? audio : ''} type={f.mime_type} controls onError={e => console.log(e)}>
                        <source src={audio ? audio : ''} type={f.mime_type} />
                    </audio>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src={imageSrc + 'assets/PrivateCabinet/file-preview_audio.svg'} alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src={imageSrc + 'assets/PrivateCabinet/play-black.svg'} alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src={imageSrc + 'assets/PrivateCabinet/pause.svg'} alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            default: {
                return <div className={styles.filePreviewWrap}>
                    {f?.is_dir
                        ? <FolderIcon className={`${styles.folderIcon} ${colors.filter(el => el.color === file.color)[0]?.name}`} />
                        : <File format={f?.ext} color={f?.color} />
                    }
                </div>
            }
        }
    }

    useEffect(() => {
        return () => {
            if(window.cancelLoadMedia) window.cancelLoadMedia.cancel()
        }
    }, [])

    return (<div
        className={`${styles.workBarsPreviewWrap} ${renderHeight(recentFiles, filePick, styles)}`}
        style={{
            gridTemplateColumns: size === 'small'
                ? 'repeat(auto-fill, 118px)'
                : size === 'medium'
                    ? 'repeat(auto-fill, 160px)'
                    : 'repeat(auto-fill, 205px)',
            gridAutoRows: size === 'small'
                ? '118px'
                : size === 'medium'
                    ? '160px'
                    : '205px',
        }}
    >
        <div
            className={`${styles.preview} ${grouped ? styles.groupedPreview : ''} ${chosenFile?.name ? '' : styles.noFile}`}
            style={{height: `calc(100% - ${innerFilesHeight()} - 40px - 10px)`}}
            ref={previewRef}
        >
            {grouped ? <div
                className={styles.collapseHeader}
            >
                <p className={`${styles.dateName}`}>{chosenFolder.group.title}</p>
                <div className={styles.buttonsWrap}>
                    <button className={`${styles.collapseBtn}`}>
                        {chosenFolder.group.amount} объектов
                    </button>
                    <div
                        className={classNames({
                            [styles.arrowFile]: true,
                        })}
                    >
                    </div>
                </div>
            </div> : null}
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {loading
                ? <Loader
                    type='bounceDots'
                    position='absolute'
                    background='rgba(0, 0, 0, 0)'
                    zIndex={5}
                    containerType='bounceDots'
                />
                : f
                    ? f.is_preview === 1
                        ? <div className={styles.innerPreview}>{renderFilePreview()}</div>
                        : <div className={styles.innerNoPreview}><div className={styles.filePreviewWrap}>
                            {f?.is_dir
                                ? <FolderIcon className={`${styles.folderIcon} ${colors.filter(el => el?.color === file?.color)[0]?.name}`} />
                                : <File format={f?.ext} color={f?.color} />
                            }
                        </div></div>
                    : null}
        </div>
        
        <div
            className={styles.renderedFiles}
            style={{width, maxWidth: width}}
        >
            <div
                ref={fileRef}
                className={styles.innerFiles}
            >
                {!gLoader && children}
                {!gLoader ? <div
                    className={`${styles.rightLine} ${filesPage === 0 ? styles.rightLineHidden : ''}`}
                    style={{height: '100%'}}
                    ref={containerRef}
                >
                    <Loader
                        type='bounceDots'
                        position='absolute'
                        background='white'
                        zIndex={5}
                        width='100px'
                        height='100px'
                        containerType='bounceDots'
                    />
                </div> : null}
            </div>
        </div>
        {gLoader ? <Loader
            type='bounceDots'
            position='absolute'
            background='rgba(255, 255, 255, 0.75)'
            zIndex={5}
            containerType='bounceDots'
        /> : null}
    </div>)
}

export default WorkBarsPreview;