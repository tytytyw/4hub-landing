import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {imageSrc, projectSrc} from '../../../../../generalComponents/globalVariables';
import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../generalComponents/collections'
import File from '../../../../../generalComponents/Files';
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {onChooseFiles} from "../../../../../Store/actions/CabinetActions";
import {useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";
import {getMedia, renderHeight} from "../../../../../generalComponents/generalHelpers";

const WorkLinesPreview = ({
      file, children, hideFileList, filesPage, setFilesPage, fileRef, filePick, gLoader
}) => {

    const recentFiles = useSelector(state => state.Cabinet.recentFiles);
    const search = useSelector(state => state.Cabinet?.search);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const [color, setColor] = useState(null);
    const [f, setF] = useState(file);
    useEffect(() => {
        setF(file);
        const newColor = colors.filter(c => c.color === file?.color)
        setColor(newColor[0]);
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
    }, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={`${f.preview}?${new Date()}`} alt='filePrieview' className={hideFileList ? styles.big_pic : ''}/>
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
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

    useEffect(() => {
        setLoadingFiles(false);
    }, [fileList?.path])

    const onSuccessLoading = (result) => {
        setLoadingFiles(false);
        result > 0 ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    const load = (entry) => {
        if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname === '/'){
            setLoadingFiles(true);
            dispatch(onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, ''));
        }
    }

    const [containerRef] = useScrollElementOnScreen(options, load);

    return (
        <div
            className={`${styles.workLinesPreviewWrap} ${renderHeight(recentFiles, filePick, styles)}`}
        >
        {!hideFileList && <div
            className={styles.fileListWrap}
            ref={fileRef}
        >
            {!gLoader && children}
            {!gLoader ? <div
                className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ''}`}
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
        </div>}
        {gLoader && <Loader
            type='bounceDots'
            position='absolute'
            background='rgba(255, 255, 255, 0.75)'
            zIndex={5}
            containerType='bounceDots'
        />}
        <div className={styles.previewFileWrap}>
            {loading
                ? <Loader
                    type='bounceDots'
                    position='absolute'
                    background='rgba(0, 0, 0, 0)'
                    zIndex={5}
                    containerType='bounceDots'
                />
                : f ? <>
                <div className={styles.preview}>
                    {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
                </div>
                <p className={styles.fileName}>{f.name}</p>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Теги</span>
                    {f.tag
                        ? <span className={styles.tagName}>#{f.tag}</span>
                        : <span className={styles.optionItem}>Добавить тег</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Цвет</span>
                    {f?.color
                        ? <span className={styles.colorCircle} style={{background: color?.light, border: `1px solid ${color?.dark}`}}/>
                        : <span className={styles.optionItem}>Добавить цвет</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Знаки</span>
                    {f?.fig
                        ? <img src={`${imageSrc}assets/PrivateCabinet/signs/${f.fig}.svg`} alt='sign' />
                        : <span className={styles.optionItem}>Добавить знаки</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Эмоджи</span>
                    {f?.emo
                        ? <img src={`${imageSrc}assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='sign'/>
                        : <span className={styles.optionItem}>Добавить эмоджи</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Создан</span>
                    {f?.ctime
                        ? <span className={styles.description}>{f.mtime.split(' ')[0]}</span>
                        : ''}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Изменен</span>
                    {f?.mtime
                        ? <span className={styles.description}>{f.ctime.split(' ')[0]}</span>
                        : ''}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Размеры</span>
                    {f?.size_now
                        ? <span className={styles.description}>{f.size_now}</span>
                        : ''}
                </div>
            </>: null}
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
        </div>
    </div>)
}

export default WorkLinesPreview;