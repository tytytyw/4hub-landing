import React, {useState, useEffect, useRef} from 'react';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../../generalComponents/collections'
import File from "../../../../../../generalComponents/Files";

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
        {!hideFileList && <div className={styles.fileListWrap}>{children}</div>}
        <div className={styles.previewFileWrap}>

        </div>
    </div>)
}

export default WorkLinesPreview;