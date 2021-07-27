import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../generalComponents/collections'
import File from '../../../../../generalComponents/Files';

const WorkLinesPreview = ({file, children, hideFileList, filePick}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const size = useSelector(state => state.PrivateCabinet.size);
    const search = useSelector(state => state.PrivateCabinet?.search);
    const [color, setColor] = useState(null);
    const [f, setF] = useState(file);
    useEffect(() => {
        setF(file);
        const newColor = colors.filter(c => c.color === file?.color)
        setColor(newColor[0]);
    }, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

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
        <div
            className={styles.workLinesPreviewWrap}
            style={{height: `${recentFiles?.length > 0
                    ? filePick.show
                        ? 'calc(100% - 90px - 55px - 78px - 80px)'
                        : 'calc(100% - 90px - 55px - 78px)'
                    : filePick.show
                        ? 'calc(100% - 90px - 55px - 80px)'
                        : 'calc(100% - 90px - 55px)'
                }`,
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
        {!hideFileList && <div className={styles.fileListWrap}>{children}</div>}
        <div className={styles.previewFileWrap}>
            {f ? <>
                <div className={styles.preview}>
                    {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
                </div>
                <span className={styles.fileName}>{f.name}</span>
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
                        ? <img src={`./assets/PrivateCabinet/signs/${f.fig}.svg`} alt='sign' />
                        : <span className={styles.optionItem}>Добавить знаки</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Эмоджи</span>
                    {f?.emo
                        ? <img src={`./assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='sign'/>
                        : <span className={styles.optionItem}>Добавить эмоджи</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Создан</span>
                    {f?.mtime
                        ? <span className={styles.description}>{f.mtime.split(' ')[0]}</span>
                        : ''}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Изменен</span>
                    {f?.ctime
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