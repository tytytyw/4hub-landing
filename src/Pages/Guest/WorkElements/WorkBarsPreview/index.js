import React, { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './WorkBarsPreview.module.sass';
import {onChooseFiles} from "../../../../../../Store/actions/PrivateCabinetActions";
import File from "../../../../../../generalComponents/Files";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

// TODO - small loader doesn't represent itself correctly
// TODO - set vertical loading instead horizontal
const WorkBarsPreview = ({
    children, file, page, setPage, fileRef, chosenFolder, gLoader
}) => {
    const { __ } = useLocales();
    const [f, setF] = useState(file);
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {setF(file); setPlay(false)}, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    // Loading files to full the page
    useEffect(() => {onCheckFilesPerPage()}, [size, page, chosenFolder?.files_amount]) // eslint-disable-line

    const onSuccessLoading = (result) => {
        setLoadingFiles(false);
        result > 0 ? setPage(page => page + 1) : setPage(0);
    }

    const loadFiles = (e, access) => {
        if(!loadingFiles && ((e?.target?.scrollHeight - e?.target?.offsetHeight - 200 < e?.target?.scrollTop) || access) && page > 0) {
            if(chosenFolder?.files_amount > fileList?.files.length) {
                setLoadingFiles(true);
                dispatch(onChooseFiles(fileList?.path, search, page, onSuccessLoading, ''));
            }
        }
    }

    const onCheckFilesPerPage = () => {
        if(fileRef?.current && fileRef?.current?.offsetHeight === fileRef?.current?.scrollHeight&& fileList?.path === chosenFolder?.path) {
            loadFiles('', true);
        }
    }

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={f.preview} alt='filePrieview' />
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
                        <img className={styles.audioPic} src={imageSrc + 'assets/PrivateCabinet/file-preview_audio.svg'} alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src={imageSrc + 'assets/PrivateCabinet/play-black.svg'} alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src={imageSrc + 'assets/PrivateCabinet/pause.svg'} alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            default: {
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

    return (<div
        className={styles.workBarsPreviewWrap}
        style={{height: `100%`,
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
        <div className={styles.preview}>
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >{ __('Нет элементов удовлетворяющих условиям поиска') }</div>
                : null}
            {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
        </div>
        <div className={styles.renderedFiles}>
            <div
                ref={fileRef}
                className={styles.innerFiles}
                onScroll={loadFiles}
            >
                {!gLoader && children}
            </div>
            <div
                className={styles.bottomLine}
                style={{width: loadingFiles ? '100px' : '40px'}}
            >
                {loadingFiles && !gLoader ? <Loader
                    type='switch'
                    position='absolute'
                    background='white'
                    zIndex={5}
                    width='100px'
                    height='100px'

                /> : null}
            </div>
        </div>
        {gLoader ? <Loader
            type='squarify'
            position='absolute'
            background='rgba(255, 255, 255, 0.75)'
            zIndex={5}
        /> : null}
    </div>)
}

export default WorkBarsPreview;